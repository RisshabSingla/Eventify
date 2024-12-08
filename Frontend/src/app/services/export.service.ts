import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  apiEndpoint = `http://localhost:8080/`;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  token = this.currentUser.token;

  constructor(private http: HttpClient) {}

  downloadAttendance(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(`${this.apiEndpoint}export/exportAllEventAttendance`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
