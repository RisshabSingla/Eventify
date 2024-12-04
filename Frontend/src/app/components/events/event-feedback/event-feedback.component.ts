import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { EventService } from '../../../services/event.service';
import {
  EventDetails,
  Feedback,
  FeedbackMetrics,
} from '../../../model/event/EventFeedback';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrl: './event-feedback.component.scss',
})
export class EventFeedbackComponent implements OnInit {
  eventId = '';
  eventDetails!: EventDetails;
  metrics!: FeedbackMetrics;
  feedbacks!: Feedback[];

  constructor(private _ar: ActivatedRoute, private eventService: EventService) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit() {
    this.eventService.getEventFeedbackData(this.eventId).subscribe((data) => {
      this.eventDetails = data.eventDetails;
      this.metrics = data.metrics;
      this.feedbacks = data.feedbacks;
    });

    this.createPieChart();
  }

  // Create Pie Chart based on feedback rating distribution
  createPieChart() {
    const ctx = document.getElementById('pie-chart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
        datasets: [
          {
            data: [
              this.metrics.feedBackCount['5 star'],
              this.metrics.feedBackCount['4 star'],
              this.metrics.feedBackCount['3 star'],
              this.metrics.feedBackCount['2 star'],
              this.metrics.feedBackCount['1 star'],
            ],
            backgroundColor: [
              '#4CAF50',
              '#FFC107',
              '#2196F3',
              '#FF5722',
              '#9E9E9E',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.raw + ' feedbacks';
              },
            },
          },
        },
      },
    });
  }
}
