import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-reports',
  templateUrl: './admin-dashboard-reports.component.html',
  styleUrl: './admin-dashboard-reports.component.scss',
})
export class AdminDashboardReportsComponent {
  metrics = {
    totalEvents: 25,
    totalFeedback: 120,
    totalRegistrations: 1500,
  };

  events = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Event ${i + 1}`,
    date: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toDateString(),
  }));

  downloadReport(type: string) {
    switch (type) {
      case 'mostPopularEvents':
        alert('Downloading Most Popular Events Report...');
        break;
      case 'upcomingEvents':
        alert('Downloading Upcoming Events Summary...');
        break;
      case 'activeUsers':
        alert('Downloading Active Users Report...');
        break;
      case 'newRegistrations':
        alert('Downloading New Registrations Report...');
        break;
      default:
        console.error('Invalid report type');
    }
  }
}
