import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { adminFeedbackView } from '../model/feedback/adminFeedbackView';
import { USER_FEEDBACK } from './dummy_data';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor() {}

  getFeedbackDetails(feedbackId: String): Observable<adminFeedbackView> {
    return of(USER_FEEDBACK);
  }
}
