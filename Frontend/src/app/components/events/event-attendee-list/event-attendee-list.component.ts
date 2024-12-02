import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-attendee-list',
  templateUrl: './event-attendee-list.component.html',
  styleUrl: './event-attendee-list.component.scss',
})
export class EventAttendeeListComponent implements OnInit {
  eventId = '';
  eventName: string = 'Tech Conference 2024';
  eventDetails: string =
    'A great event for tech enthusiasts and professionals.';
  eventPrivacySetting: string = 'Only to Registered Users';
  isListVisible: boolean = false;
  userHasRegistered: boolean = false;
  isAdmin: boolean = true;
  attendees = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      registrationDate: '2024-12-01',
      ticketType: 'VIP',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      registrationDate: '2024-12-02',
      ticketType: 'Regular',
    },
    {
      name: 'Alice Brown',
      email: 'alice@example.com',
      registrationDate: '2024-12-03',
      ticketType: 'VIP',
    },
  ];

  constructor(private _ar: ActivatedRoute, private router: Router) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    this.checkListVisibility();
  }
  checkListVisibility(): void {
    if (this.isAdmin) {
      this.isListVisible = true;
      return;
    }

    if (this.eventPrivacySetting === 'Private') {
      this.isListVisible = false;
    } else if (this.eventPrivacySetting === 'Only to Registered Users') {
      if (this.userHasRegistered) {
        this.isListVisible = true;
      }
    } else {
      this.isListVisible = true;
    }
  }

  getDisplayStatus() {
    if (this.eventPrivacySetting === 'Public') {
      return 'The attendee list is public.';
    } else if (this.eventPrivacySetting === 'Only to Registered Users') {
      return 'The attendee list is available to registered users only.';
    } else {
      return 'The attendee list is private.';
    }
  }

  downloadAttendeeList() {
    alert('Excel download in progress');
  }
}
