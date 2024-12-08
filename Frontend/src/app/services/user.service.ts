import { Injectable } from '@angular/core';
import { UserDashboardItems } from '../model/user/Items';
import { Observable, of } from 'rxjs';
import {
  USER_DASHBOARD_DATA,
  USER_DASHBOARD_EVENTS,
  USER_DASHBOARD_EVENTS_QR,
  USER_DASHBOARD_GIVE_FEEDBACK_EVENTS,
  USER_DASHBOARD_VIEW_FEEDBACK_EVENTS,
} from './dummy_data';
import { UserEvents } from '../model/user/registeredEvents';
import { EventQRCode } from '../model/user/QRCode';
import { EventGiveFeedback } from '../model/user/giveFeedback';
import { UserFeedback } from '../model/user/viewFeedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiEndpoint = `http://localhost:8080/`;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  token = this.currentUser.token;

  constructor(private http: HttpClient) {}

  getDashBoardItems(): Observable<UserDashboardItems> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<UserDashboardItems>(
      `${this.apiEndpoint}users/getUserDashboardDetails`,
      { headers }
    );

    return of(USER_DASHBOARD_DATA);
  }

  getUserEvents(): Observable<UserEvents> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<UserEvents>(
      `${this.apiEndpoint}events/getRegisteredEvents`,
      { headers }
    );

    // return of(USER_DASHBOARD_EVENTS);
  }

  getUserQREvents(): Observable<EventQRCode[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<EventQRCode[]>(
      `${this.apiEndpoint}events/getQRCodes`,
      { headers }
    );

    // return of(USER_DASHBOARD_EVENTS_QR);
  }

  getUserGiveFeedback(): Observable<EventGiveFeedback[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<EventGiveFeedback[]>(
      `${this.apiEndpoint}events/getAttendedEvents`,
      { headers }
    );

    // return of(USER_DASHBOARD_GIVE_FEEDBACK_EVENTS);
  }

  getUserViewFeedback(): Observable<UserFeedback[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<UserFeedback[]>(
      `${this.apiEndpoint}feedback/getFeedbacks`,
      { headers }
    );

    // return of(USER_DASHBOARD_VIEW_FEEDBACK_EVENTS);
  }
}
