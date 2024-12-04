import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminFeedbackView } from '../../../model/feedback/adminFeedbackView';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrl: './feedback-view.component.scss',
})
export class FeedbackViewComponent implements OnInit {
  feedbackId = '';

  feedbackDetails!: adminFeedbackView;
  constructor(
    private _ar: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {
    this.feedbackId = _ar.snapshot.params['feedbackId'];
    console.log(this.feedbackId);
  }

  ngOnInit(): void {
    this.feedbackService
      .getFeedbackDetails(this.feedbackId)
      .subscribe((data: adminFeedbackView) => {
        this.feedbackDetails = data;
      });
  }
}
