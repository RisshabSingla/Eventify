import { Event } from './Event_Management';

export interface attendanceMetrics {
  totalRegisteredUsers: number;
  totalAttendedUsers: number;
  attendanceRate: number;
  totalNoShowUsers: number;
}

export interface EventAttendance {
  metrics: attendanceMetrics;
  events: Event[];
}
