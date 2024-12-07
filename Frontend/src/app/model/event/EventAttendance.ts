export interface EventAttendanceMetrics {
  capacity: number;
  filled: number;
  present: number;
  yetToCome: number;
  absent: number;
}

export interface AttendanceUser {
  id: string;
  name: string;
  email: string;
  registeredDate: string;
  currentStatus: string;
  attending: string;
  attendanceCode: string;
}

export interface EventDetails {
  name: string;
  description: string;
  location: string;
  date: Date;
}

export interface EventAttendanceData {
  metrics: EventAttendanceMetrics;
  users: AttendanceUser[];
  eventDetails: EventDetails;
}
