import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventGiveFeedbackData } from '../../../model/event/EventGiveFeedback';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent implements OnInit {
  eventId = '';
  feedbackForm!: FormGroup;
  event!: EventGiveFeedbackData;

  constructor(
    private _ar: ActivatedRoute,
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    this.feedbackService
      .getFeedbackEventData(this.eventId)
      .subscribe((data: EventGiveFeedbackData) => {
        this.event = data;
      });

    this.feedbackForm = this.fb.group({
      overallRating: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      speakerRating: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      venueRating: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      comments: ['', Validators.required],
      improvements: [''],
      futureSuggestions: [''],
    });
  }

  onSubmit() {
    console.log('hello');
    console.log(this.feedbackForm.value);
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    // Handle the form submission logic here if the form is valid
    this.feedbackService.submitFeedback(this.feedbackForm.value);
    console.log(this.feedbackForm.value);
  }

  get formControls() {
    return this.feedbackForm.controls;
  }
}
