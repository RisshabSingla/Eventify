import { Injectable } from '@angular/core';
import {
  ADMIN_DASHBOARD_DATA,
  ADMIN_DASHBOARD_EVENT_ANALYTICS_DATA,
  ADMIN_DASHBOARD_EVENT_ATTENDANCE_DATA,
  ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA,
  ADMIN_DASHBOARD_FEEDBACK_DATA,
  ADMIN_DASHBOARD_NOTIFICATIONS_DATA,
  ADMIN_DASHBOARD_REPORTS_DATA,
} from './dummy_data';
import { Items } from '../model/admin/Items';
import { forkJoin, map, Observable, of } from 'rxjs';
import { EventManagement } from '../model/admin/Event_Management';
import {
  AnalyticMetrics,
  EventAnalytics,
} from '../model/admin/Event_Analytics';
import { EventAttendance } from '../model/admin/Event_Attendance';
import { AdminNotification } from '../model/admin/Notifications';
import { EventFeedback } from '../model/admin/Event_Feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../model/admin/Event';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiEndpoint = `http://localhost:8080/`;

  constructor(private http: HttpClient) {}

  getDashboardItems(): Observable<Items> {
    return of(ADMIN_DASHBOARD_DATA);
  }

  getEventManagementData(): Observable<EventManagement> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const allEvents = this.http.get<Event[]>(
      `${this.apiEndpoint}events/getAllEvents`,
      { headers }
    );
    const createdByAdminEvents = this.http.get<Event[]>(
      `${this.apiEndpoint}events/getMyCreatedEvents`,
      { headers }
    );

    return forkJoin([createdByAdminEvents, allEvents]).pipe(
      map(([createdByAdminEvents, allEvents]) => ({
        createdByAdminEvents: createdByAdminEvents,
        allEvents: allEvents,
      }))
    );
    // return of(ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA);
  }

  getEventAnalyticsData(): Observable<EventAnalytics> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const createdByAdminEvents = this.http.get<Event[]>(
      `${this.apiEndpoint}events/getMyCreatedEvents`,
      { headers }
    );

    const eventAnalytics = this.http.get<AnalyticMetrics>(
      `${this.apiEndpoint}events/getOverallEventAnalytics`,
      { headers }
    );

    return forkJoin([createdByAdminEvents, eventAnalytics]).pipe(
      map(([createdByAdminEvents, eventAnalytics]) => ({
        metrics: eventAnalytics,
        events: createdByAdminEvents,
      }))
    );

    return of(ADMIN_DASHBOARD_EVENT_ANALYTICS_DATA);
  }

  getEventAttendanceData(): Observable<EventAttendance> {
    return of(ADMIN_DASHBOARD_EVENT_ATTENDANCE_DATA);
  }

  getNotifications(): Observable<AdminNotification[]> {
    return of(ADMIN_DASHBOARD_NOTIFICATIONS_DATA);
  }

  getFeedbackData(): Observable<EventFeedback> {
    return of(ADMIN_DASHBOARD_FEEDBACK_DATA);
  }

  getReportsData() {
    return of(ADMIN_DASHBOARD_REPORTS_DATA);
  }
}
