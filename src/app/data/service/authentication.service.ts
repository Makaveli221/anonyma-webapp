import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@schema/user';
import { environment } from '@environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Roles } from '@schema/roles';


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

  signIn(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/signin`, {username: username, password: password}).pipe(map(response => {
        const user = response as User;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('accessToken', response['accessToken']);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
    return true;
  }

  signUp(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, user);
  }

  isExpired() {
    const myRawToken = this.getToken();
    return this.jwtHelper.isTokenExpired(myRawToken);
  }

  decodedToken(myRawToken) {
    return this.jwtHelper.decodeToken(myRawToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getRolesName(roles: string[]) {
    let roleString = 'UTILISATEUR';
    if (roles.indexOf(Roles.ROLE_ADMIN) > -1) {
      roleString = 'ADMINISTRATEUR';
    }
    if (roles.indexOf(Roles.ROLE_MODERATOR) > -1) {
      roleString = 'MODERATEUR';
    }
    return roleString;
  }

  isAuthenticated() {
    if (this.getToken() && !this.isExpired()) {
      return true;
    } else {
      this.signOut();
      return false;
    }
  }
}
