import { Event } from './Event';

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
