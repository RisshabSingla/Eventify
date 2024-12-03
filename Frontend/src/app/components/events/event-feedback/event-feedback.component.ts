import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrl: './event-feedback.component.scss',
})
export class EventFeedbackComponent implements OnInit {
  eventId = '';
  eventDetails = {
    title: 'Event Title Example',
    description:
      'This event focuses on discussing the importance of feedback in improving future events.',
    date: '2024-12-12',
    venue: 'Sample Venue, Location',
  };

  // Feedback Metrics
  metrics = {
    totalFeedbacks: 125,
    averageRating: 4.2,
    positiveFeedback: '75%',
    negativeFeedback: '25%',
  };

  // Feedback data array
  feedbacks = [
    {
      id: 1,
      name: 'John Doe',
      feedback: 'Great event, learned a lot!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      feedback: 'Fantastic speakers and sessions.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      feedback: 'Good content but a bit too technical for beginners.',
      rating: 3,
    },
    {
      id: 4,
      name: 'Sarah Lee',
      feedback: 'The event was well-organized and insightful.',
      rating: 5,
    },
    {
      id: 5,
      name: 'David Wilson',
      feedback: 'Enjoyed the event, but the venue was a bit cramped.',
      rating: 4,
    },
    {
      id: 6,
      name: 'Emily Davis',
      feedback: 'Loved the networking opportunities!',
      rating: 5,
    },
    {
      id: 7,
      name: 'Daniel Taylor',
      feedback: 'Interesting topics, but the sessions were too short.',
      rating: 3,
    },
    {
      id: 8,
      name: 'Sophie Brown',
      feedback: 'Excellent event, I would definitely attend again.',
      rating: 5,
    },
    {
      id: 9,
      name: 'Chris Green',
      feedback: 'Great event, but I was expecting more technical depth.',
      rating: 4,
    },
    {
      id: 10,
      name: 'Lisa White',
      feedback: 'Not much new information for me.',
      rating: 2,
    },
    {
      id: 11,
      name: 'Jake Black',
      feedback: 'The sessions were very engaging and interactive.',
      rating: 5,
    },
    {
      id: 12,
      name: 'Olivia Harris',
      feedback: 'Great speakers, but the food could have been better.',
      rating: 4,
    },
    {
      id: 13,
      name: 'Lucas Hall',
      feedback: 'Very informative, but a little overwhelming.',
      rating: 3,
    },
    {
      id: 14,
      name: 'Charlotte Moore',
      feedback: 'The event was excellent, very well organized.',
      rating: 5,
    },
    {
      id: 15,
      name: 'Mason King',
      feedback: 'Great event, but the WiFi was terrible.',
      rating: 3,
    },
    {
      id: 16,
      name: 'Ava Scott',
      feedback: 'Loved the keynote speakers, very inspirational!',
      rating: 5,
    },
    {
      id: 17,
      name: 'Noah Young',
      feedback: 'It was alright, some sessions were not relevant.',
      rating: 2,
    },
    {
      id: 18,
      name: 'Amelia Adams',
      feedback: 'Amazing content, would love to attend again!',
      rating: 5,
    },
    {
      id: 19,
      name: 'Ethan Baker',
      feedback: 'Good content, but lacked hands-on sessions.',
      rating: 4,
    },
    {
      id: 20,
      name: 'Isabella Nelson',
      feedback: 'The event was fantastic, well worth attending.',
      rating: 5,
    },
  ];

  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit() {
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
            data: [60, 30, 10, 5, 2],
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
