import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrl: './admin-notifications.component.scss',
})
export class AdminNotificationsComponent {
  notifications = [
    {
      type: 'new event',
      description: 'A new event has been created: Tech Conference 2024.',
      timestamp: new Date(),
      eventId: 1,
    },
    {
      type: 'user registration',
      description: 'A new user has registered: John Doe.',
      timestamp: new Date(),
      eventId: null,
    },
    {
      type: 'event update',
      description: 'Event details have been updated for: AI Workshop.',
      timestamp: new Date(),
      eventId: 2,
    },
    {
      type: 'user feedback',
      description: 'User feedback has been submitted for: React Summit.',
      timestamp: new Date(),
      eventId: 3,
    },
    {
      type: 'event registration',
      description: 'New user has registered for: Cloud Summit.',
      timestamp: new Date(),
      eventId: 4,
    },
  ];

  constructor(private router: Router) {}

  pushNewNotification() {
    console.log('New Notification button clicked');
  }
}
