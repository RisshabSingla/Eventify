import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrl: './event-feedback.component.scss',
})
export class EventFeedbackComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
