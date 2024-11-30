import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-attendee-list',
  templateUrl: './event-attendee-list.component.html',
  styleUrl: './event-attendee-list.component.scss',
})
export class EventAttendeeListComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
