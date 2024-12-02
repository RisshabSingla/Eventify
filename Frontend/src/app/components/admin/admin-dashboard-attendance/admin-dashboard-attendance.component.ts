import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-attendance',
  templateUrl: './admin-dashboard-attendance.component.html',
  styleUrl: './admin-dashboard-attendance.component.scss',
})
export class AdminDashboardAttendanceComponent {
  metrics = {
    totalRegisteredUsers: 500,
    totalAttendedUsers: 400,
    attendanceRate: 80, // in percentage
    totalNoShowUsers: 100,
  };

  // Dummy data for events
  events = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-12-10' },
    { id: 2, name: 'AI Workshop', date: '2024-12-15' },
    { id: 3, name: 'Hackathon', date: '2024-12-20' },
    { id: 4, name: 'Angular Masterclass', date: '2024-12-22' },
    { id: 5, name: 'Cloud Summit', date: '2025-01-05' },
  ];

  constructor() {}

  // Dummy method to download the attendance
  downloadAttendance() {
    alert('Attendance for all events downloaded!');
  }
}
