import { Injectable } from '@angular/core';
import {
  ADMIN_DASHBOARD_DATA,
  ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA,
} from './dummy_data';
import { Items } from '../model/admin/Items';
import { Observable, of } from 'rxjs';
import { EventManagement } from '../model/admin/Event_Management';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getAdminDashboardItems(): Observable<Items> {
    return of(ADMIN_DASHBOARD_DATA);
  }

  getAdminDashboardEventManagementData(): Observable<EventManagement> {
    return of(ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA);
  }
}
