import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DUMMY_EVENTS_DATA, EVENT_ANALYTIC_DATA } from './dummy_data';
import { EventDetails } from '../model/event/EventDetails';
import { EventAnalytic } from '../model/event/EventAnalytic';

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
}
