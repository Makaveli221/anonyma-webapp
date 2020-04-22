import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment';
import { Topic } from '@schema/topic';


@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  get(key: string) {
		return this.http.get(`${environment.apiUrl}/topic/${key}`);
  }
  
  create(formData: any) {
    const headers = { 'Content-Type': 'multipart/form-data;boundary' };
		return this.http.post(`${environment.apiUrl}/topic/add`, formData, {headers});
  }
  
  update(key: string, formData: any) {
    const headers = { 'Content-Type': 'multipart/form-data;boundary' }
		return this.http.put(`${environment.apiUrl}/topic/update/${key}`, formData, {headers});
  }

	delete(key: string) {
		return this.http.delete(`${environment.apiUrl}/topic/delete/${key}`);
  }

  all() {
		return this.http.get(`${environment.apiUrl}/topic/all`);
  }
  
	getAllBySubject(key: string, page: number = 1, limit: number = 10) {
		return this.http.get(`${environment.apiUrl}/topic/subject/${key}?page=${page - 1}&limit=${limit}`);
  }

  getAllByCreateUser(id: string, page: number = 1, limit: number = 10) {
		return this.http.get(`${environment.apiUrl}/topic/createuser/${id}?page=${page - 1}&limit=${limit}`);
  }
}
