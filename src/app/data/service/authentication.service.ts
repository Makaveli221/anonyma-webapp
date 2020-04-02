import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@schema/user';
import { environment } from '@environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private jwtHelper: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.jwtHelper = new JwtHelperService();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username).set('password', password);

    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      }).pipe(map(response => {
        const data = this.decodedToken(response['access_token']);
        const user = this.setUser(data);

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('access_token', response['access_token']);
        localStorage.setItem('refresh_token', response['refresh_token']);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    const body = new HttpParams()
      .set('refresh_token', this.getRefreshToken());
    
    // log user out to Keycloak
    this.http.post<any>(`${environment.apiUrl}/protocol/openid-connect/logout`, body.toString(),{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.getToken()}`)
      }
    );
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    return true;
  }

  setUser(data: any) {
    const user: User = {
      matricule: this.escapeStr(data.preferred_username),
      username: data.preferred_username,
      fullname: data.name,
      firstName: this.cropText(data.given_name.split(' [')[0],20),
      lastName: data.family_name,
      email:  data.email
    }
    return user;
  }

  isExpired() {
    const myRawToken = this.getToken();
    return this.jwtHelper.isTokenExpired(myRawToken);
  }

  decodedToken(myRawToken) {
    return this.jwtHelper.decodeToken(myRawToken);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  cropText(str: string, limit: number) {
		if (str.length <= limit) {
			return str;
		}
		return `${str.substring(0, limit)}...`;
  }
  
  escapeStr(str: string) {
    return str.replace(/[^0-9\.]+/g, '');
  }
}
