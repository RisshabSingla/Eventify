import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  DUMMY_EVENTS_DATA,
  EVENT_ANALYTIC_DATA,
  EVENT_ATTENDANCE_DATA,
} from './dummy_data';
import { EventDetails } from '../model/event/EventDetails';
import { EventAnalytic } from '../model/event/EventAnalytic';
import { EventAttendanceData } from '../model/event/EventAttendance';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getAllEvents(): Observable<EventDetails[]> {
    return of(DUMMY_EVENTS_DATA);
  }

  getEventAnalyticsData(id: string): Observable<EventAnalytic> {
    console.log(id);
    return of(EVENT_ANALYTIC_DATA);
  }

  getEventAttendanceData(id: string): Observable<EventAttendanceData> {
    console.log(id);
    return of(EVENT_ATTENDANCE_DATA);
  }

  markAttendanceforUser(eventId: string, userId: number, status: string): void {
    console.log(eventId, userId, status);
  }
}
