import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { User } from '@schema/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  all(page: number = 1, limit: number = 10) {
		return this.http.get(`${environment.apiUrl}/user/all?page=${page - 1}&limit=${limit}`);
  }

  get(id: string) {
		return this.http.get(`${environment.apiUrl}/user/${id}`);
  }

  create(user: User) {
    return this.http.post(`${environment.apiUrl}/user/add`, user);
  }

  update(id: string, user: User) {
		return this.http.put(`${environment.apiUrl}/user/update/${id}`, user);
  }

  updateProfil(user: User) {
		return this.http.post(`${environment.apiUrl}/user/profil/update`, user);
  }

	delete(id: string) {
		return this.http.delete(`${environment.apiUrl}/user/delete/${id}`);
  }

  listRoles() {
		return this.http.get(`${environment.apiUrl}/user/roles`);
  }
}
