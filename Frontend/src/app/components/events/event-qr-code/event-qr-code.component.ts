import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-qr-code',
  templateUrl: './event-qr-code.component.html',
  styleUrl: './event-qr-code.component.scss',
})
export class EventQrCodeComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
