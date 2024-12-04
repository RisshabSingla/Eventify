export interface eventDetails {
  eventId: number;
  eventName: string;
  eventDetails: string;
  eventPrivacySetting: string;
}

export interface Attendee {
  name: string;
  email: string;
  registrationDate: string;
}

export interface UserDetail {
  userHasRegistered: boolean;
  isAdmin: boolean;
}

export interface EventAttendee {
  eventDetails: eventDetails;
  userDetail: UserDetail;
  attendees: Attendee[];
}
