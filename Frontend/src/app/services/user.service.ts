import { Injectable } from '@angular/core';
import { UserDashboardItems } from '../model/user/Items';
import { Observable, of } from 'rxjs';
import { USER_DASHBOARD_DATA } from './dummy_data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getDashBoardItems(): Observable<UserDashboardItems> {
    return of(USER_DASHBOARD_DATA);
  }
}
