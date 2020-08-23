import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeaserService {

  constructor(private http: HttpClient) { }

  get(id: string) {
		return this.http.get(`${environment.apiUrl}/teaser/${id}`);
  }

  getFile(fileName: string): Observable<Blob> {
		return this.http.get(`${environment.apiUrl}/teaser/files/${fileName}`, { responseType: 'blob' });
  }
  
  create(formData: any) {
    const headers = { 'Content-Type': 'multipart/form-data;boundary' };
		return this.http.post(`${environment.apiUrl}/teaser/add`, formData, {headers});
  }
  
  update(key: string, formData: any) {
    const headers = { 'Content-Type': 'multipart/form-data;boundary' }
		return this.http.put(`${environment.apiUrl}/teaser/update/${key}`, formData, {headers});
  }

	delete(key: string) {
		return this.http.delete(`${environment.apiUrl}/teaser/delete/${key}`);
  }

  all() {
		return this.http.get(`${environment.apiUrl}/teaser/all`);
  }
}
