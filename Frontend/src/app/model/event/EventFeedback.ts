export interface EventDetails {
  eventId: string;
  title: string;
  description: string;
  date: string;
  venue: string;
}

export interface FeedbackCount {
  '1 star': number;
  '2 star': number;
  '3 star': number;
  '4 star': number;
  '5 star': number;
}

export interface FeedbackMetrics {
  totalFeedbacks: number;
  averageRating: number;
  positiveFeedback: number;
  negativeFeedback: number;
  feedBackCount: FeedbackCount;
}

export interface Feedback {
  id: string;
  name: string;
  feedback: string;
  rating: number;
}

export interface EventFeedbackData {
  eventDetails: EventDetails;
  metrics: FeedbackMetrics;
  feedbacks: Feedback[];
}
