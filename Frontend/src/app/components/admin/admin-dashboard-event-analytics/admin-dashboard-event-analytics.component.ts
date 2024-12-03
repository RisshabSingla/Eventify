import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import {
  EventAnalytics,
  AnalyticMetrics,
} from '../../../model/admin/Event_Analytics';
import { Event } from '../../../model/admin/Event_Management';

@Component({
  selector: 'app-admin-dashboard-event-analytics',
  templateUrl: './admin-dashboard-event-analytics.component.html',
  styleUrl: './admin-dashboard-event-analytics.component.scss',
})
export class AdminDashboardEventAnalyticsComponent implements OnInit {
  metrics!: AnalyticMetrics;
  events: Event[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getAdminDashboardEventAnalytics()
      .subscribe((data: EventAnalytics) => {
        this.metrics = data.metrics;
        this.events = data.events;
      });
  }
}
