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
import { EventAnalytics } from '../model/admin/Event_Analytics';
import { EventAttendance } from '../model/admin/Event_Attendance';
import { AdminNotification } from '../model/admin/Notifications';
import { EventFeedback } from '../model/admin/Event_Feedback';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getDashboardItems(): Observable<Items> {
    return of(ADMIN_DASHBOARD_DATA);
  }

  getEventManagementData(): Observable<EventManagement> {
    return of(ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA);
  }

  getEventAnalyticsData(): Observable<EventAnalytics> {
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
