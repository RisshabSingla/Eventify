import { Event } from './Event';

export interface AnalyticMetrics {
  totalCreatedEvents: number;
  totalRegisteredUsers: number;
  totalAttendedUsers: number;
  averageFeedbackRating: number;
}
export interface EventAnalytics {
  metrics: AnalyticMetrics;
  events: Event[];
}
