import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { EventService } from '../../../services/event.service';
import {
  EventDetails,
  EventStats,
  FeedbackStats,
} from '../../../model/event/EventReport';

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.component.html',
  styleUrl: './event-report.component.scss',
})
export class EventReportComponent implements OnInit {
  eventId = '';
  eventDetails!: EventDetails;
  eventStats!: EventStats;
  feedbackStats!: FeedbackStats;

  constructor(
    private _ar: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit() {
    this.eventService.getEventReports(this.eventId).subscribe((data) => {
      this.eventDetails = data.eventDetails;
      this.eventStats = data.eventStats;
      this.feedbackStats = data.feedbackStats;
      this.createAttendanceChart();
      this.createFeedbackChart();
    });
  }

  // Create Attendance Bar Chart
  createAttendanceChart() {
    const ctx1 = document.getElementById(
      'attendanceChart'
    ) as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Registered', 'Attended'],
        datasets: [
          {
            label: 'Attendance Stats',
            data: [
              this.eventStats.totalRegistrations,
              this.eventStats.totalAttendees,
            ],
            backgroundColor: [
              'rgba(255, 159, 64, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: ['rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Create Feedback Pie Chart
  createFeedbackChart() {
    const ctx2 = document.getElementById('feedbackChart') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Positive Feedback', 'Negative Feedback'],
        datasets: [
          {
            data: [
              this.feedbackStats.positiveFeedback,
              this.feedbackStats.negativeFeedback,
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
            hoverBackgroundColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  goToEventPage() {
    this.router.navigate(['/admin/event-management/', this.eventId]);
  }
}
