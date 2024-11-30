import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-subscribe',
  templateUrl: './event-subscribe.component.html',
  styleUrl: './event-subscribe.component.scss',
})
export class EventSubscribeComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
