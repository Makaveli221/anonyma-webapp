import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Subject } from '@schema/subject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  get(id: number) {
		return this.http.get(`${environment.apiUrl}/subject/${id}`);
  }
  
  create(subject: Subject) {
		return this.http.post(`${environment.apiUrl}/subject/add`, subject);
  }
  
  update(id: number, subject: Subject) {
		return this.http.put(`${environment.apiUrl}/subject/update/${id}`, subject);
  }

	delete(id: number) {
		return this.http.delete(`${environment.apiUrl}/subject/delete/${id}`);
  }
  
	all(page: number = 1) {
		return this.http.get(`${environment.apiUrl}/subject/all?page=${page - 1}`);
  }
}
