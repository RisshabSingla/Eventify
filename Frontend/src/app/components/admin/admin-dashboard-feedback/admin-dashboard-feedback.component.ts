import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-feedback',
  templateUrl: './admin-dashboard-feedback.component.html',
  styleUrl: './admin-dashboard-feedback.component.scss',
})
export class AdminDashboardFeedbackComponent {
  // Feedback overview metrics
  metrics = {
    totalFeedbacks: 145,
    averageRating: 4.2,
    highestRating: 5,
  };

  // Dummy events created by the admin
  events = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-12-01' },
    { id: 2, name: 'AI Workshop', date: '2024-11-20' },
    { id: 3, name: 'Hackathon', date: '2024-10-15' },
    { id: 4, name: 'Product Launch', date: '2024-12-10' },
    { id: 5, name: 'Startup Meetup', date: '2024-09-25' },
    { id: 6, name: 'Data Science Bootcamp', date: '2024-11-01' },
    { id: 7, name: 'Blockchain Summit', date: '2024-10-30' },
    { id: 8, name: 'IoT Expo', date: '2024-11-15' },
    { id: 9, name: 'Cloud Computing Forum', date: '2024-09-10' },
    { id: 10, name: 'Cybersecurity Webinar', date: '2024-12-05' },
    { id: 11, name: 'Design Thinking Workshop', date: '2024-08-20' },
    { id: 12, name: 'DevOps Conference', date: '2024-10-05' },
    { id: 13, name: 'Gaming Hackathon', date: '2024-07-15' },
    { id: 14, name: 'Fintech Innovations', date: '2024-09-18' },
    { id: 15, name: 'HealthTech Symposium', date: '2024-11-10' },
    { id: 16, name: 'Machine Learning Seminar', date: '2024-10-12' },
    { id: 17, name: 'Big Data Analytics', date: '2024-09-08' },
    { id: 18, name: 'AR/VR Immersion', date: '2024-10-20' },
    { id: 19, name: 'Social Media Masterclass', date: '2024-08-12' },
    { id: 20, name: 'Quantum Computing Talk', date: '2024-07-10' },
  ];

  // Recent feedbacks with some anonymous entries
  recentFeedbacks = [
    { user: 'John Doe', rating: 5, comment: 'Amazing experience!' },
    { user: 'Jane Smith', rating: 4, comment: 'Very informative event.' },
    { user: null, rating: 3, comment: 'Could be better.' },
    { user: 'Anonymous', rating: 4, comment: 'Great organization!' },
    { user: 'Alice Brown', rating: 5, comment: 'Exceptional delivery!' },
    { user: 'Bob Johnson', rating: 4, comment: 'Learned a lot, thanks!' },
    { user: null, rating: 2, comment: 'Too basic for my level.' },
    { user: 'Chris Evans', rating: 5, comment: 'Perfectly organized.' },
    { user: 'Emma Watson', rating: 4, comment: 'Well-structured content.' },
    { user: 'Harry Potter', rating: 3, comment: 'Room for improvement.' },
    { user: 'Ron Weasley', rating: 4, comment: 'Good overall.' },
    { user: 'Hermione Granger', rating: 5, comment: 'Loved every bit of it!' },
    { user: null, rating: 3, comment: 'Average, could use more examples.' },
    { user: 'Bruce Wayne', rating: 4, comment: 'Highly engaging.' },
    { user: 'Clark Kent', rating: 5, comment: 'Great presentation style.' },
    { user: 'Diana Prince', rating: 4, comment: 'Good, but a bit lengthy.' },
    { user: 'Steve Rogers', rating: 5, comment: 'Fantastic insights.' },
    { user: null, rating: 3, comment: 'Not bad, but not great either.' },
    {
      user: 'Tony Stark',
      rating: 5,
      comment: 'The best event I have attended!',
    },
    { user: 'Natasha Romanoff', rating: 4, comment: 'Very well-planned.' },
  ];

  constructor(private router: Router) {}
  // Refresh feedbacks method
  refreshFeedbacks() {
    console.log('Refreshing feedbacks...');
    // Implement logic to fetch updated feedback data from the backend
  }

  // Navigate to event feedbacks page
  viewEventFeedbacks(eventId: number) {
    console.log(`Navigating to feedbacks for Event ID: ${eventId}`);
    this.router.navigate(['/admin/feedback', eventId]);
    // Implement navigation logic
  }
}
