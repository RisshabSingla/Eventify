import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { EventAnalytic } from '../../../model/event/EventAnalytic';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-analytics',
  templateUrl: './event-analytics.component.html',
  styleUrl: './event-analytics.component.scss',
})
export class EventAnalyticsComponent implements OnInit {
  eventId = '';
  event!: EventAnalytic;

  constructor(
    private _ar: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    this.eventService
      .getEventAnalyticsData(this.eventId)
      .subscribe((event: EventAnalytic) => (this.event = event));

    this.createRegistrationGraph();
    this.createFeedbackGraph();
  }

  createRegistrationGraph(): void {
    const ctx = document.getElementById(
      'registrationGraph'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Registrations', 'Actual Attendance', 'Skipped'],
        datasets: [
          {
            label: 'Registrations Overview',
            data: [
              this.event.totalRegistrations,
              this.event.actualAttendance,
              this.event.totalRegistrations - this.event.actualAttendance,
            ],
            backgroundColor: ['#3AAFA9', '#2ECC71', '#E74C3C'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createFeedbackGraph(): void {
    const ctx = document.getElementById('feedbackGraph') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
          {
            label: 'Feedback Breakdown',
            data: [
              this.event.feedbackCounts['1 star'],
              this.event.feedbackCounts['2 star'],
              this.event.feedbackCounts['3 star'],
              this.event.feedbackCounts['4 star'],
              this.event.feedbackCounts['5 star'],
            ],
            backgroundColor: [
              '#E74C3C',
              '#F39C12',
              '#F1C40F',
              '#2ECC71',
              '#3AAFA9',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  goToAttendancePage(): void {
    // alert('Navigating to Attendance Page...');
    this.router.navigate(['admin/attendance/' + this.eventId]);
  }

  goToFeedbackPage(): void {
    this.router.navigate(['admin/feedback/' + this.eventId]);
  }
}
