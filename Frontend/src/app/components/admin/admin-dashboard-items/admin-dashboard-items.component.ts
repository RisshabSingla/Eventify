import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
}

interface Activity {
  description: string;
  detail: string;
  timestamp: string;
}

@Component({
  selector: 'app-admin-dashboard-items',
  templateUrl: './admin-dashboard-items.component.html',
  styleUrl: './admin-dashboard-items.component.scss',
})
export class AdminDashboardItemsComponent {
  metrics = [
    { title: 'Total Users', value: 1234 },
    { title: 'Total Events', value: 87 },
    { title: 'Registrations Today', value: 45 },
  ];

  upcomingEvents: Event[] = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-05-01',
      time: '10:00 AM',
    },
    {
      id: 2,
      name: 'Web Development Workshop',
      date: '2024-06-15',
      time: '2:00 PM',
    },

    {
      id: 3,
      name: 'AI & Machine Learning Seminar',
      date: '2024-07-20',
      time: '9:00 AM',
    },
  ];

  recentActivities: Activity[] = [
    {
      description: 'New Event Created',
      detail: 'React Workshop',
      timestamp: 'Dec 1, 2024 · 1:00 PM',
    },
    {
      description: 'User Registration',
      detail: 'John Doe',
      timestamp: 'Dec 1, 2024 · 11:30 AM',
    },
    {
      description: 'Feedback Submitted',
      detail: 'Great Event!',
      timestamp: 'Dec 1, 2024 · 10:00 AM',
    },
  ];

  constructor(private router: Router) {}

  navigateToEventDetail(eventId: number): void {
    this.router.navigate([`/admin/event-management/${eventId}`]);
  }
}
