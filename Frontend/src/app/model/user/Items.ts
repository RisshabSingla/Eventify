export interface UserDetail {
  userImageUrl: string;
  userName: string;
  userEmail: string;
  phoneNumber: string;
}

export interface UserEventSummary {
  registeredEvents: number;
  upcomingEvents: number;
  eventsAttended: number;
}

export interface UserStats {
  totalEventsRegistered: number;
  feedbackGiven: number;
}

export interface UserDashboardItems {
  userDetails: UserDetail;
  userEventSummary: UserEventSummary;
  userStats: UserStats;
}
