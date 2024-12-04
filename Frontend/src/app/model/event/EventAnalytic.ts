interface EventFeedbackCounts {
  '1 star': number;
  '2 star': number;
  '3 star': number;
  '4 star': number;
  '5 star': number;
}

export interface EventAnalytic {
  id: string;
  name: string;
  totalRegistrations: number;
  actualAttendance: number;
  feedbackRating: number;
  totalFeedbackCount: number;
  feedbackCounts: EventFeedbackCounts;
  topFeedbacks: string[];
}
