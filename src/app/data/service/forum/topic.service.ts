import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Topic } from '@schema/topic';


@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  get(id: number) {
		return this.http.get(`${environment.apiUrl}/topic/${id}`);
  }
  
  create(topic: Topic) {
		return this.http.post(`${environment.apiUrl}/topic/add`, topic);
  }
  
  update(id: number, topic: Topic) {
		return this.http.put(`${environment.apiUrl}/topic/update/${id}`, topic);
  }

	delete(id: number) {
		return this.http.delete(`${environment.apiUrl}/topic/delete/${id}`);
  }

  all() {
		return this.http.get(`${environment.apiUrl}/topic/all`);
  }
  
	getAllBySubject(key: string, page: number = 1) {
		return this.http.get(`${environment.apiUrl}/topic/subject/${key}?page=${page - 1}`);
  }
}
