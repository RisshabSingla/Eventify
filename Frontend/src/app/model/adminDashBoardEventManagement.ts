export interface AdminDashboardEventManagement_Event {
  id: number;
  name: string;
  date: string;
  description: string;
}

export interface AdminDashboardEventManagement {
  createdByAdminEvents: AdminDashboardEventManagement_Event[];
  allEvents: AdminDashboardEventManagement_Event[];
}
