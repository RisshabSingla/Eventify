export interface AdminDashboardItems {
  metrics: { title: string; value: number }[];
  upcomingEvents: { id: number; name: string; date: string; time: string }[];
  recentActivities: {
    description: string;
    detail: string;
    timestamp: string;
  }[];
}
