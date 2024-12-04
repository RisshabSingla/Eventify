import { Injectable } from '@angular/core';
import { UserDashboardItems } from '../model/user/Items';
import { Observable, of } from 'rxjs';
import {
  USER_DASHBOARD_DATA,
  USER_DASHBOARD_EVENTS,
  USER_DASHBOARD_EVENTS_QR,
  USER_DASHBOARD_GIVE_FEEDBACK_EVENTS,
  USER_DASHBOARD_VIEW_FEEDBACK_EVENTS,
} from './dummy_data';
import { UserEvents } from '../model/user/registeredEvents';
import { EventQRCode } from '../model/user/QRCode';
import { EventGiveFeedback } from '../model/user/giveFeedback';
import { UserFeedback } from '../model/user/viewFeedback';

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

  getUserGiveFeedback(): Observable<EventGiveFeedback[]> {
    return of(USER_DASHBOARD_GIVE_FEEDBACK_EVENTS);
  }

  getUserViewFeedback(): Observable<UserFeedback[]> {
    return of(USER_DASHBOARD_VIEW_FEEDBACK_EVENTS);
  }
}
