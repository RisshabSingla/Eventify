import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-analytics',
  templateUrl: './event-analytics.component.html',
  styleUrl: './event-analytics.component.scss',
})
export class EventAnalyticsComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
