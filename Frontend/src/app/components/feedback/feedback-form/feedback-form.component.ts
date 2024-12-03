import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent implements OnInit {
  eventId = '';
  feedbackForm!: FormGroup;

  event = {
    name: 'Tech Conference 2024',
    date: '2024-12-03',
    time: '10:00 AM',
    venue: 'Main Auditorium',
  };
  constructor(private _ar: ActivatedRoute, private fb: FormBuilder) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
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
      // Mark all controls as touched to trigger validation messages
      this.feedbackForm.markAllAsTouched();
      return; // Prevent form submission if invalid
    }

    // Handle the form submission logic here if the form is valid
    console.log(this.feedbackForm.value);
  }

  get formControls() {
    return this.feedbackForm.controls;
  }
}
