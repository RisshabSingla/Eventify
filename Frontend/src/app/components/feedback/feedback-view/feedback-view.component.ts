import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrl: './feedback-view.component.scss',
})
export class FeedbackViewComponent {
  feedbackId = '';

  eventDetails = {
    title: 'Annual Tech Conference 2024',
  };

  feedbackDetails = {
    id: 'FB-238',
    submissionDate: '2024-12-01',
    userName: 'John Doe',
    rating: 4, // Star rating: 4 out of 5
    feedbackText:
      'The event was great, but the technical difficulties during the keynote were frustrating. Would love to see improvements in the AV setup next time.',
  };

  constructor(private _ar: ActivatedRoute) {
    this.feedbackId = _ar.snapshot.params['feedbackId'];
    console.log(this.feedbackId);
  }
}
