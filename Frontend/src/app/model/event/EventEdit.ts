export interface AgendaItem {
  agendaItem: string;
  startTime: string;
}

export interface Speaker {
  name: string;
  bio: string;
}

export interface EventEdit {
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventCategory: string;
  registrationLimit: number;
  eventTags: string;
  coverImage: string;
  agenda: AgendaItem[];
  speakers: Speaker[];
  attendeeList: 'public' | 'private' | 'Only to Registered Users';
}
