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
import { Observable, of } from 'rxjs';
import { EventManagement } from '../model/admin/Event_Management';
import {
  AnalyticMetrics,
  EventAnalytics,
} from '../model/admin/Event_Analytics';
import {
  attendanceMetrics,
  EventAttendance,
} from '../model/admin/Event_Attendance';
import { AdminNotification } from '../model/admin/Notifications';
import {
  EventFeedback,
  feedbackMetrics,
  recentFeedback,
} from '../model/admin/Event_Feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../model/admin/Event';
import { UserDetail } from '../model/user/Items';
import { EventReport } from '../model/admin/Event_Reports';
import { Admin_Event_Details } from '../model/admin/Admin_Event_Details';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiEndpoint = `http://localhost:8080/`;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  token = this.currentUser.token;
  constructor(private http: HttpClient) {}

  getDashboardItems(): Observable<Items> {
    return of(ADMIN_DASHBOARD_DATA);
  }

  getEventNames(): Observable<Admin_Event_Details[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<Admin_Event_Details[]>(
      `${this.apiEndpoint}events/getEventNames`,
      {
        headers,
      }
    );
  }

  getEventManagementData(): Observable<EventManagement> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<EventManagement>(
      `${this.apiEndpoint}events/getEventManagementDetails`,
      { headers }
    );
    // return of(ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA);
  }

  getEventAnalyticsData(): Observable<EventAnalytics> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<EventAnalytics>(
      `${this.apiEndpoint}events/getEventAnalyticsPageDetails`,
      { headers }
    );
    // return of(ADMIN_DASHBOARD_EVENT_ANALYTICS_DATA);
  }

  getEventAttendanceData(): Observable<EventAttendance> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<EventAttendance>(
      `${this.apiEndpoint}events/getEventAttendancePageDetails`,
      { headers }
    );

    // return of(ADMIN_DASHBOARD_EVENT_ATTENDANCE_DATA);
  }

  getNotifications(): Observable<AdminNotification[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<AdminNotification[]>(
      `${this.apiEndpoint}notifications/getAdminNotifications`,
      { headers }
    );

    // return of(ADMIN_DASHBOARD_NOTIFICATIONS_DATA);
  }

  getFeedbackData(): Observable<EventFeedback> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<EventFeedback>(
      `${this.apiEndpoint}events/GetEventFeedbackPageDetails`,
      { headers }
    );

    // return of(ADMIN_DASHBOARD_FEEDBACK_DATA);
  }

  getReportsData(): Observable<EventReport> {
    return of(ADMIN_DASHBOARD_REPORTS_DATA);
  }

  getUserDetails(): Observable<UserDetail> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<UserDetail>(
      `${this.apiEndpoint}users/getUserDetails`,
      { headers }
    );
  }
}
