export interface Speaker {
  name: string;
  bio: string;
}

export interface Media {
  type: 'image' | 'video'; // or other types if you plan to extend
  src: string;
}

export interface EventDetail {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  agenda: string[];
  speakers: Speaker[];
  media: Media[];
  registrationLimit: number;
  filledSeats: number;
}

export interface EventDetailPage {
  eventDetails: EventDetail;
  isUserRegisteredForEvent: boolean;
}
