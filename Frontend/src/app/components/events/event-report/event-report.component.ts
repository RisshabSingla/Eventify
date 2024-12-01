import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.component.html',
  styleUrl: './event-report.component.scss',
})
export class EventReportComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
