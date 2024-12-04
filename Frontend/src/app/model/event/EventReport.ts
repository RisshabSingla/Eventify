export interface EventDetails {
  id: string;
  title: string;
  dateTime: string;
  venue: string;
  description: string;
}

export interface EventStats {
  totalAttendees: number;
  totalRegistrations: number;
  eventCapacity: number;
  attendanceRate: number;
}

export interface FeedbackStats {
  totalFeedbacks: number;
  averageRating: number;
  positiveFeedback: number;
  negativeFeedback: number;
}

export interface EventReports {
  eventDetails: EventDetails;
  eventStats: EventStats;
  feedbackStats: FeedbackStats;
}
