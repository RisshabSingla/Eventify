import { Event } from './Event';

export interface feedbackMetrics {
  totalFeedbacks: number;
  averageRating: number;
  highestRating: number;
}

export interface recentFeedback {
  user: string | null;
  rating: number;
  comment: string;
}

export interface EventFeedback {
  metrics: feedbackMetrics;
  events: Event[];
  recentFeedbacks: recentFeedback[];
}
