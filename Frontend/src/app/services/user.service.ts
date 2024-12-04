import { Injectable } from '@angular/core';
import { UserDashboardItems } from '../model/user/Items';
import { Observable, of } from 'rxjs';
import { USER_DASHBOARD_DATA, USER_DASHBOARD_EVENTS } from './dummy_data';
import { UserEvents } from '../model/user/registeredEvents';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getDashBoardItems(): Observable<UserDashboardItems> {
    return of(USER_DASHBOARD_DATA);
  }

  getUserEvents(): Observable<UserEvents> {
    return of(USER_DASHBOARD_EVENTS);
  }
}
