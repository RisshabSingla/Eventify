import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-event-analytics',
  templateUrl: './admin-dashboard-event-analytics.component.html',
  styleUrl: './admin-dashboard-event-analytics.component.scss',
})
export class AdminDashboardEventAnalyticsComponent {
  metrics = {
    totalCreatedEvents: 5,
    totalRegisteredUsers: 150,
    totalAttendedUsers: 120,
    averageFeedbackRating: 4.3,
  };

  // Dummy data for the admin events
  events = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-12-10' },
    { id: 2, name: 'AI Workshop', date: '2024-12-15' },
    { id: 3, name: 'Hackathon', date: '2024-12-20' },
    { id: 4, name: 'Angular Masterclass', date: '2024-12-22' },
    { id: 5, name: 'Cloud Summit', date: '2025-01-05' },
  ];
}
