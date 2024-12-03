import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.scss',
})
export class EventEditComponent {
  eventId = '';
  constructor(private _ar: ActivatedRoute, private router: Router) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }
}
