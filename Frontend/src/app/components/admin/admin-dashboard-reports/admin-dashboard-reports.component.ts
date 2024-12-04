import { Component, OnInit } from '@angular/core';
import {
  EventReport,
  reportsMetrics,
} from '../../../model/admin/Event_Reports';
import { Event } from '../../../model/admin/Event';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard-reports',
  templateUrl: './admin-dashboard-reports.component.html',
  styleUrl: './admin-dashboard-reports.component.scss',
})
export class AdminDashboardReportsComponent implements OnInit {
  metrics!: reportsMetrics;
  events: Event[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getReportsData().subscribe((data: EventReport) => {
      this.metrics = data.metrics;
      this.events = data.events;
    });
  }

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
