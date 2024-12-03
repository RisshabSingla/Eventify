import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventFeedback,
  feedbackMetrics,
  recentFeedback,
} from '../../../model/admin/Event_Feedback';
import { Event } from '../../../model/admin/Event';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard-feedback',
  templateUrl: './admin-dashboard-feedback.component.html',
  styleUrl: './admin-dashboard-feedback.component.scss',
})
export class AdminDashboardFeedbackComponent implements OnInit {
  metrics!: feedbackMetrics;
  events: Event[] = [];
  recentFeedbacks: recentFeedback[] = [];

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getFeedbackData().subscribe((data: EventFeedback) => {
      this.metrics = data.metrics;
      this.events = data.events;
      this.recentFeedbacks = data.recentFeedbacks;
    });
  }
  refreshFeedbacks() {
    console.log('Refreshing feedbacks...');
  }

  // Navigate to event feedbacks page
  viewEventFeedbacks(eventId: number) {
    console.log(`Navigating to feedbacks for Event ID: ${eventId}`);
    this.router.navigate(['/admin/feedback', eventId]);
  }
}
