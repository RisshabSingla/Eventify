import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedbackFormComponent, FeedbackViewComponent],
  imports: [CommonModule, FeedbackRoutingModule, ReactiveFormsModule],
})
export class FeedbackModule {}
