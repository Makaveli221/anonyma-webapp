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
  
  create(topic: any) {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    const headers = { 'Content-Type': 'multipart/form-data;boundary' }
		return this.http.post(`${environment.apiUrl}/topic/add`, topic, {headers});
  }
  
  update(key: string, topic: Topic) {
		return this.http.put(`${environment.apiUrl}/topic/update/${key}`, topic);
  }

	delete(key: string) {
		return this.http.delete(`${environment.apiUrl}/topic/delete/${key}`);
  }

  all() {
		return this.http.get(`${environment.apiUrl}/topic/all`);
  }
  
	getAllBySubject(key: string, page: number = 1, limit: number = 20) {
		return this.http.get(`${environment.apiUrl}/topic/subject/${key}?page=${page - 1}&limit=${limit}`);
  }

  getAllByCreateUser(id: string, page: number = 1, limit: number = 20) {
		return this.http.get(`${environment.apiUrl}/topic/createuser/${id}?page=${page - 1}&limit=${limit}`);
  }
}
