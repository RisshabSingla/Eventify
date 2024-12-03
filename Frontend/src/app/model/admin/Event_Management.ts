import { Event } from './Event';

export interface EventManagement {
  createdByAdminEvents: Event[];
  allEvents: Event[];
}
