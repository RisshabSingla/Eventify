import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  DUMMY_EVENTS_DATA,
  EVENT_ANALYTIC_DATA,
  EVENT_ATTENDANCE_DATA,
  EVENT_ATTENDEE_DATA,
  EVENT_DETAIL_PAGE_DATA,
  EVENT_EDIT_DATA,
  EVENT_FEEDBACK_DATA,
  EVENT_REPORT_DATA,
} from './dummy_data';
import { EventDetails } from '../model/event/EventDetails';
import { EventAnalytic } from '../model/event/EventAnalytic';
import { EventAttendanceData } from '../model/event/EventAttendance';
import { EventAttendee } from '../model/event/EventAttendee';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { EventDetailPage } from '../model/event/EventDetail';
import { EventEdit } from '../model/event/EventEdit';
import { EventFeedbackData } from '../model/event/EventFeedback';
import { EventReports } from '../model/event/EventReport';

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

  getEventAttendeeData(
    eventId: String,
    userId: number
  ): Observable<EventAttendee> {
    return of(EVENT_ATTENDEE_DATA);
  }

  createEvent(eventData: any) {
    console.log(eventData);
  }

  getEventDetails(
    eventId: string,
    userId: number
  ): Observable<EventDetailPage> {
    console.log(eventId, userId);
    return of(EVENT_DETAIL_PAGE_DATA);
  }

  getEventEditDetails(eventId: string): Observable<EventEdit> {
    return of(EVENT_EDIT_DATA);
  }

  getEventFeedbackData(eventId: string): Observable<EventFeedbackData> {
    return of(EVENT_FEEDBACK_DATA);
  }

  getEventReports(eventId: string): Observable<EventReports> {
    return of(EVENT_REPORT_DATA);
  }
}
