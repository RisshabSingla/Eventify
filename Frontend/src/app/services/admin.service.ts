import { Injectable } from '@angular/core';
import { ADMIN_DASHBOARD_DATA } from './dummy_data';
import { AdminDashboardItems } from '../model/adminDashBoardItems';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getAdminDashboardItems(): Observable<AdminDashboardItems> {
    return of(ADMIN_DASHBOARD_DATA);
  }
}
