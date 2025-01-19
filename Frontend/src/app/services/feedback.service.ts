import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { adminFeedbackView } from '../model/feedback/adminFeedbackView';
import { EVENT_GIVE_FEEDBACK, USER_FEEDBACK } from './dummy_data';
import { EventGiveFeedbackData } from '../model/event/EventGiveFeedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  apiEndpoint = environment.apiEndpoint;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  token = this.currentUser.token;
  constructor(private http: HttpClient) {}

  getFeedbackDetails(feedbackId: String): Observable<adminFeedbackView> {
    return of(USER_FEEDBACK);
  }

  getFeedbackEventData(eventId: String): Observable<EventGiveFeedbackData> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<EventGiveFeedbackData>(
      `${this.apiEndpoint}events/getEventDetailsFeedback/` + eventId,
      { headers }
    );

    // return of(EVENT_GIVE_FEEDBACK);
  }

  submitFeedback(feedbackForm: any, eventId: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(
      `${this.apiEndpoint}feedback/giveFeedback/` + eventId,
      feedbackForm,
      { headers }
    );

    console.log(feedbackForm);
  }
}
