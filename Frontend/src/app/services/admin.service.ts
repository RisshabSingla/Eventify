import { Injectable } from '@angular/core';
import {
  ADMIN_DASHBOARD_DATA,
  ADMIN_DASHBOARD_EVENT_ANALYTICS_DATA,
  ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA,
} from './dummy_data';
import { Items } from '../model/admin/Items';
import { Observable, of } from 'rxjs';
import { EventManagement } from '../model/admin/Event_Management';
import { EventAnalytics } from '../model/admin/Event_Analytics';

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
}
