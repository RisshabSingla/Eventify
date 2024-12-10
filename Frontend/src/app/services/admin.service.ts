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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
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

    // return of(ADMIN_DASHBOARD_EVENT_ANALYTICS_DATA);
  }

  getEventAttendanceData(): Observable<EventAttendance> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const createdByAdminEvents = this.http.get<Event[]>(
      `${this.apiEndpoint}events/getMyCreatedEvents`,
      { headers }
    );

    const eventAttendanceMetrics = this.http.get<attendanceMetrics>(
      `${this.apiEndpoint}events/getOverallAttendanceAnalytics`,
      { headers }
    );

    return forkJoin([createdByAdminEvents, eventAttendanceMetrics]).pipe(
      map(([createdByAdminEvents, eventAttendanceMetrics]) => ({
        metrics: eventAttendanceMetrics,
        events: createdByAdminEvents,
      }))
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

    const createdByAdminEvents = this.http.get<Event[]>(
      `${this.apiEndpoint}events/getMyCreatedEvents`,
      { headers }
    );

    const eventFeedbackMetrics = this.http.get<feedbackMetrics>(
      `${this.apiEndpoint}events/getOverallFeedbackAnalytics`,
      { headers }
    );

    const recentFeedbacks = this.http.get<recentFeedback[]>(
      `${this.apiEndpoint}events/getRecentFeedbacks`,
      { headers }
    );

    return forkJoin([
      createdByAdminEvents,
      recentFeedbacks,
      eventFeedbackMetrics,
    ]).pipe(
      map(([createdByAdminEvents, recentFeedbacks, eventFeedbackMetrics]) => ({
        metrics: eventFeedbackMetrics,
        events: createdByAdminEvents,
        recentFeedbacks: recentFeedbacks,
      }))
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
