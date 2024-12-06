export interface AdminNotification {
  type: string;
  description: string;
  timestamp: Date;
  eventId: string | null;
}
