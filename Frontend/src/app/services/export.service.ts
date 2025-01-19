import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  apiEndpoint = environment.apiEndpoint;
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

  downloadAttendanceforEvent(eventId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(
      `${this.apiEndpoint}export/exportEventAttendance/${eventId}`,
      {
        headers: headers,
        responseType: 'blob',
      }
    );
  }

  downloadMostPopularEvents(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiEndpoint}export/exportMostPopularEvents`, {
      headers: headers,
      responseType: 'blob',
    });
  }

  downloadUpcomingEvents(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiEndpoint}export/exportUpcomingEvents`, {
      headers: headers,
      responseType: 'blob',
    });
  }

  downloadActiveUsers(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiEndpoint}export/exportActiveUsers`, {
      headers: headers,
      responseType: 'blob',
    });
  }

  downloadNewRegistrations(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiEndpoint}export/exportNewRegistrations`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
