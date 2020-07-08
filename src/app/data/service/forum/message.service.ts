import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Message } from '@schema/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  get(id: string) {
		return this.http.get(`${environment.apiUrl}/message/filterbyid/${id}`);
  }
  
  create(message: Message) {
		return this.http.post(`${environment.apiUrl}/message/add`, message);
  }

  update(id: string, message: Message) {
		return this.http.put(`${environment.apiUrl}/message/update/${id}`, message);
  }

	delete(id: string) {
		return this.http.delete(`${environment.apiUrl}/message/delete/${id}`);
  }

  allHistory() {
		return this.http.get(`${environment.apiUrl}/message/all/history`);
  }

  allHistoryPublished() {
		return this.http.get(`${environment.apiUrl}/message/history/published`);
  }

  allChatbot() {
		return this.http.get(`${environment.apiUrl}/message/all/chatbox`);
  }

  getAllComments(id: string) {
		return this.http.get(`${environment.apiUrl}/message/${id}/comments`);
  }

  getCountComments(id: string) {
		return this.http.get(`${environment.apiUrl}/message/${id}/comments/count`);
  }

  addComment(formData: any) {
		return this.http.post(`${environment.apiUrl}/message/comment/add`, formData);
  }
}
