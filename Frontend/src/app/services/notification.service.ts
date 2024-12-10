import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiEndpoint = `http://localhost:8080/`;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  token = this.currentUser.token;

  constructor(private http: HttpClient) {}

  sendNotification(
    type: String,
    eventId: String,
    message: String
  ): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<string>(
      `${this.apiEndpoint}notifications/sendNotification`,
      {
        message: message,
        eventId: eventId || type,
      },
      {
        headers,
      }
    );
  }
}
