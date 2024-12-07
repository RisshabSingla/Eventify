import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
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
import { EventDetail, EventDetailPage } from '../model/event/EventDetail';
import { EventEdit } from '../model/event/EventEdit';
import { EventFeedbackData } from '../model/event/EventFeedback';
import { EventReports } from '../model/event/EventReport';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiEndpoint = `http://localhost:8080/`;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  token = this.currentUser.token;

  constructor(private http: HttpClient) {}

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

  createEvent(eventData: any): Observable<any> {
    console.log(eventData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(this.apiEndpoint + 'events/create', eventData, {
      headers,
    });
  }

  getEventDetails(eventId: string): Observable<EventDetailPage> {
    console.log(eventId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const eventDetails = this.http.get<EventDetail>(
      `${this.apiEndpoint}events/getEventDetail/` + eventId,
      { headers }
    );

    const eventRegistered = this.http.get<boolean>(
      `${this.apiEndpoint}events/CheckIfRegistered/` + eventId,
      { headers }
    );

    return forkJoin([eventRegistered, eventDetails]).pipe(
      map(([eventRegistered, eventDetails]) => ({
        eventDetails: eventDetails,
        isUserRegisteredForEvent: eventRegistered,
      }))
    );

    // return of(EVENT_DETAIL_PAGE_DATA);
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

  registerEvent(eventId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(
      `${this.apiEndpoint}events/register/` + eventId,
      null,
      {
        headers,
      }
    );
  }

  unregisterEvent(eventId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(
      `${this.apiEndpoint}events/unregister/` + eventId,
      null,
      {
        headers,
      }
    );
  }
}
