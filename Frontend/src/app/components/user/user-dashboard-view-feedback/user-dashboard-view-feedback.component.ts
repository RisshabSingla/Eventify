import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-view-feedback',
  templateUrl: './user-dashboard-view-feedback.component.html',
  styleUrl: './user-dashboard-view-feedback.component.scss',
})
export class UserDashboardViewFeedbackComponent {
  // Sample data for feedbacks, replace with real data from API or service
  feedbacks = [
    {
      eventName: 'Tech Conference 2024',
      description: 'A deep dive into the latest tech trends.',
      image: 'https://via.placeholder.com/400x200',
      date: '2024-06-15',
      venue: 'Convention Center, NYC',
      rating: 4.5,
      speakerRating: 4,
      venueRating: 5,
      comments: 'The event was fantastic, but the sessions could be longer.',
      suggestions: 'More interactive sessions with Q&A.',
    },
    {
      eventName: 'Health Symposium',
      description: 'An informative event on the latest in health sciences.',
      image: 'https://via.placeholder.com/400x200',
      date: '2024-07-20',
      venue: 'City Hall, London',
      rating: 3.8,
      speakerRating: 4,
      venueRating: 3,
      comments:
        'The speakers were good, but the venue was a bit uncomfortable.',
      suggestions: 'Choose a bigger venue with better seating arrangements.',
    },
  ];

  isOverlayOpen = false;
  selectedFeedback: any = null;

  // Open overlay with selected feedback details
  openFeedbackOverlay(feedback: any) {
    this.selectedFeedback = feedback;
    this.isOverlayOpen = true;
  }

  // Close the overlay
  closeFeedbackOverlay() {
    this.isOverlayOpen = false;
    this.selectedFeedback = null;
  }
}
