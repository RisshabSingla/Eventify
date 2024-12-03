import { Event } from './Event_Management';

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
