import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DUMMY_EVENTS_DATA } from './dummy_data';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getAllEvents() {
    return of(DUMMY_EVENTS_DATA);
  }
}
