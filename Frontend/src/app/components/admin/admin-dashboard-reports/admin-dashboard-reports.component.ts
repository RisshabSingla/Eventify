import { Component, OnInit } from '@angular/core';
import {
  EventReport,
  reportsMetrics,
} from '../../../model/admin/Event_Reports';
import { Event } from '../../../model/admin/Event';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-admin-dashboard-reports',
  templateUrl: './admin-dashboard-reports.component.html',
  styleUrl: './admin-dashboard-reports.component.scss',
})
export class AdminDashboardReportsComponent implements OnInit {
  metrics!: reportsMetrics;
  events: Event[] = [];

  constructor(
    private adminService: AdminService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.adminService.getReportsData().subscribe((data: EventReport) => {
      this.metrics = data.metrics;
      this.events = data.events;
    });
  }

  downloadReport(type: string) {
    switch (type) {
      case 'mostPopularEvents':
        this.downloadFile(
          this.exportService.downloadMostPopularEvents(),
          'most_popular_events.xlsx'
        );
        break;
      case 'upcomingEvents':
        this.downloadFile(
          this.exportService.downloadUpcomingEvents(),
          'upcoming_events.xlsx'
        );
        break;
      case 'activeUsers':
        this.downloadFile(
          this.exportService.downloadActiveUsers(),
          'active_users.xlsx'
        );
        break;
      case 'newRegistrations':
        this.downloadFile(
          this.exportService.downloadNewRegistrations(),
          'new_registrations.xlsx'
        );
        break;
      default:
        console.error('Invalid report type');
    }
  }

  private downloadFile(observable: Observable<Blob>, fileName: string) {
    observable.subscribe(
      (data: Blob) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  }
}
