export interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
}

export interface EventManagement {
  createdByAdminEvents: Event[];
  allEvents: Event[];
}
