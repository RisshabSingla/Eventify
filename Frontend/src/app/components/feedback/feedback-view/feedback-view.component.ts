import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrl: './feedback-view.component.scss',
})
export class FeedbackViewComponent {
  feedbackId = '';
  constructor(private _ar: ActivatedRoute) {
    this.feedbackId = _ar.snapshot.params['feedbackId'];
    console.log(this.feedbackId);
  }
}
