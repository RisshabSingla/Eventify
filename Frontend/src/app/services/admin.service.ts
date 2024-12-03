import { Injectable } from '@angular/core';
import {
  ADMIN_DASHBOARD_DATA,
  ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA,
} from './dummy_data';
import { AdminDashboardItems } from '../model/adminDashBoardItems';
import { Observable, of } from 'rxjs';
import { AdminDashboardEventManagement } from '../model/adminDashBoardEventManagement';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getAdminDashboardItems(): Observable<AdminDashboardItems> {
    return of(ADMIN_DASHBOARD_DATA);
  }

  getAdminDashboardEventManagementData(): Observable<AdminDashboardEventManagement> {
    return of(ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA);
  }
}
