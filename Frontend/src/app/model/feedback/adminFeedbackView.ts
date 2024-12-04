export interface adminFeedbackView {
  feedBackId: string;
  eventId: string;
  eventName: String;
  userName: String | null;
  rating: Number;
  submissionDate: string;
  speakerRating: Number;
  venueRating: Number;
  comments: String;
  suggestions: String;
}
