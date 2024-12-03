import { Event } from './Event';

export interface reportsMetrics {
  totalEvents: number;
  totalFeedback: number;
  totalRegistrations: number;
}

export interface EventReports {
  metrics: reportsMetrics;
  events: Event[];
}
