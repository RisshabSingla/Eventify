import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.component.html',
  styleUrl: './event-attendance.component.scss',
})
export class EventAttendanceComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
