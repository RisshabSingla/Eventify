import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.component.html',
  styleUrl: './event-report.component.scss',
})
export class EventReportComponent implements OnInit {
  eventId = '';

  eventDetails = {
    title: 'Tech Conference 2024',
    dateTime: '15th Dec 2024, 10:00 AM',
    venue: 'Grand Convention Center, NYC',
    description:
      'A gathering of tech enthusiasts for talks, workshops, and networking opportunities.',
  };

  // Dummy Data for Event Statistics
  eventStats = {
    totalAttendees: 500,
    totalRegistrations: 600,
    eventCapacity: 800,
    attendanceRate: 83.3,
    totalFeedbacks: 300,
  };

  // Dummy Data for Feedback Overview
  feedbackStats = {
    averageRating: 4.5,
    positiveFeedback: 85,
    negativeFeedback: 15,
    topSuggestions: 'Great event, would love more interactive sessions!',
  };

  // Dummy data for feedbacks list
  feedbacks = [
    {
      id: 1,
      name: 'John Doe',
      feedback: 'Amazing event! Great speakers and workshops.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      feedback: 'Very informative but could use more interactive sessions.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Robert Brown',
      feedback: 'Not bad, but the venue was too small.',
      rating: 3,
    },
    {
      id: 4,
      name: 'Emily Clark',
      feedback: 'Fantastic event, learned a lot!',
      rating: 5,
    },
    {
      id: 5,
      name: 'Mike Davis',
      feedback: 'The event could have been organized better.',
      rating: 2,
    },
    // More feedback entries...
  ];

  constructor(private _ar: ActivatedRoute, private router: Router) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit() {
    this.createAttendanceChart();
    this.createFeedbackChart();
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

  downloadReport() {
    alert('Downloading report for this event');
  }

  goToEventPage() {
    this.router.navigate(['/admin/event-management/', this.eventId]);
  }
}
