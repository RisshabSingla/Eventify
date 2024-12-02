import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-event-management',
  templateUrl: './admin-dashboard-event-management.component.html',
  styleUrl: './admin-dashboard-event-management.component.scss',
})
export class AdminDashboardEventManagementComponent implements OnInit {
  isSmallScreen: boolean = false;

  createdByAdminEvents = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-12-10' },
    { id: 2, name: 'AI Workshop', date: '2024-12-15' },
    { id: 3, name: 'Hackathon', date: '2024-12-20' },
    { id: 4, name: 'Angular Masterclass', date: '2024-12-22' },
    { id: 5, name: 'Cloud Summit', date: '2025-01-05' },
  ];

  // Dummy data for all events
  allEvents = [
    { id: 6, name: 'Social Meetup', date: '2024-12-05' },
    { id: 7, name: 'Webinar on JavaScript', date: '2024-12-12' },
    { id: 8, name: 'Python Bootcamp', date: '2024-12-18' },
    { id: 9, name: 'Networking Event', date: '2024-12-22' },
    { id: 10, name: 'React Summit', date: '2025-01-10' },
    { id: 11, name: 'Data Science Workshop', date: '2025-01-15' },
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  constructor(private router: Router) {}

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  createEvent() {
    this.router.navigate(['/admin/event-management/create']);
  }
}
