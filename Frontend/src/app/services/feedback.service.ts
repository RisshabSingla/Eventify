import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { adminFeedbackView } from '../model/feedback/adminFeedbackView';
import { EVENT_GIVE_FEEDBACK, USER_FEEDBACK } from './dummy_data';
import { EventGiveFeedbackData } from '../model/event/EventGiveFeedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor() {}

  getFeedbackDetails(feedbackId: String): Observable<adminFeedbackView> {
    return of(USER_FEEDBACK);
  }

  getFeedbackEventData(eventId: String): Observable<EventGiveFeedbackData> {
    return of(EVENT_GIVE_FEEDBACK);
  }

  submitFeedback(feedbackForm: any) {
    console.log(feedbackForm);
  }
}
