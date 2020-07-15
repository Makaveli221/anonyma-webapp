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

  getLastHistory() {
		return this.http.get(`${environment.apiUrl}/message/last`);
  }

  allHistory(page: number = 1, limit: number = 20) {
		return this.http.get(`${environment.apiUrl}/message/all/history?page=${page - 1}&limit=${limit}`);
  }

  allHistoryPublished(page: number = 1, limit: number = 20) {
		return this.http.get(`${environment.apiUrl}/message/history/published?page=${page - 1}&limit=${limit}`);
  }

  allChatbot(page: number = 1, limit: number = 20) {
		return this.http.get(`${environment.apiUrl}/message/all/chatbox?page=${page - 1}&limit=${limit}`);
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
