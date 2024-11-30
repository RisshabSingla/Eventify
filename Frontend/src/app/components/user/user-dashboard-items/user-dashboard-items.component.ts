import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-items',
  templateUrl: './user-dashboard-items.component.html',
  styleUrl: './user-dashboard-items.component.scss',
})
export class UserDashboardItemsComponent implements OnInit {
  // Example user data
  userImageUrl: string = 'https://via.placeholder.com/150'; // Placeholder image URL
  userName: string = 'John Doe';
  userEmail: string = 'john.doe@example.com';

  // Event participation summary
  registeredEvents: number = 5;
  upcomingEvents: number = 2;
  eventsAttended: number = 3;

  // Notifications (Can be dynamic)
  notifications: string[] = [
    'Upcoming Event: Tech Conference on Dec 15th',
    'Reminder: Event registration closes soon',
    'Your feedback for the last event has been recorded',
  ];

  // User stats
  totalEventsRegistered: number = 10;
  feedbackGiven: number = 4;

  // Upcoming event (most recent)
  upcomingEvent = {
    name: 'Tech Conference 2024',
    date: new Date('2024-12-15'),
    location: 'Online',
  };

  constructor() {}

  ngOnInit(): void {
    // Here you can load real user data from a service
  }
}
