import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DUMMY_EVENTS_DATA } from './dummy_data';
import { EventDetails } from '../model/event/EventDetails';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getAllEvents(): Observable<EventDetails[]> {
    return of(DUMMY_EVENTS_DATA);
  }
}
