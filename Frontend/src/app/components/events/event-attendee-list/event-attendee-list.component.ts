import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Attendee,
  EventAttendee,
  eventDetails,
  UserDetail,
} from '../../../model/event/EventAttendee';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-event-attendee-list',
  templateUrl: './event-attendee-list.component.html',
  styleUrl: './event-attendee-list.component.scss',
})
export class EventAttendeeListComponent implements OnInit {
  eventId = '';
  eventDetails!: eventDetails;
  userDetail!: UserDetail;
  attendees!: Attendee[];
  isListVisible = false;

  constructor(
    private _ar: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    const id = currentUser.id;
    this.eventService
      .getEventAttendeeData(this.eventId, id)
      .subscribe((data) => {
        this.eventDetails = data.eventDetails;
        this.userDetail = data.userDetail;
        this.attendees = data.attendees;
      });
    console.log(this.userDetail);
    this.checkListVisibility();
  }
  checkListVisibility(): void {
    if (this.userDetail.isAdmin) {
      this.isListVisible = true;
      return;
    }

    if (this.eventDetails.eventPrivacySetting === 'Private') {
      this.isListVisible = false;
    } else if (
      this.eventDetails.eventPrivacySetting === 'Only to Registered Users'
    ) {
      if (this.userDetail.userHasRegistered) {
        this.isListVisible = true;
      }
    } else {
      this.isListVisible = true;
    }
  }

  downloadAttendeeList() {
    alert('Excel download in progress');
  }
}
