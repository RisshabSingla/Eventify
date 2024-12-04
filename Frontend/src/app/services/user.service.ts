import { Injectable } from '@angular/core';
import { UserDashboardItems } from '../model/user/Items';
import { Observable, of } from 'rxjs';
import {
  USER_DASHBOARD_DATA,
  USER_DASHBOARD_EVENTS,
  USER_DASHBOARD_EVENTS_QR,
} from './dummy_data';
import { UserEvents } from '../model/user/registeredEvents';
import { EventQRCode } from '../model/user/QRCode';

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

  getUserQREvents(): Observable<EventQRCode[]> {
    return of(USER_DASHBOARD_EVENTS_QR);
  }
}
