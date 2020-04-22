import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Subject } from '@schema/subject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  get(key: string) {
		return this.http.get(`${environment.apiUrl}/subject/${key}`);
  }
  
  create(subject: Subject) {
		return this.http.post(`${environment.apiUrl}/subject/add`, subject);
  }
  
  update(key: string, subject: Subject) {
		return this.http.put(`${environment.apiUrl}/subject/update/${key}`, subject);
  }

	delete(key: string) {
		return this.http.delete(`${environment.apiUrl}/subject/delete/${key}`);
  }

  getAllByType(name: string, page: number = 1, limit: number = 10) {
		return this.http.get(`${environment.apiUrl}/subject/typesubject/${name}?page=${page - 1}&limit=${limit}`);
  }
  
	all(page: number = 1, limit: number = 10) {
		return this.http.get(`${environment.apiUrl}/subject/all?page=${page - 1}&limit=${limit}`);
  }
}
