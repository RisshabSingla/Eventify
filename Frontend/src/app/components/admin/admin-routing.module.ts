import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { EventAttendanceComponent } from '../events/event-attendance/event-attendance.component';
import { EventCreateComponent } from '../events/event-create/event-create.component';
import { AdminDashboardItemsComponent } from './admin-dashboard-items/admin-dashboard-items.component';
import { AdminDashboardEventManagementComponent } from './admin-dashboard-event-management/admin-dashboard-event-management.component';
import { AdminDashboardEventAnalyticsComponent } from './admin-dashboard-event-analytics/admin-dashboard-event-analytics.component';
import { AdminDashboardRegistrationsComponent } from './admin-dashboard-registrations/admin-dashboard-registrations.component';
import { AdminDashboardAttendanceComponent } from './admin-dashboard-attendance/admin-dashboard-attendance.component';
import { AdminDashboardFeedbackComponent } from './admin-dashboard-feedback/admin-dashboard-feedback.component';
import { AdminDashboardReportsComponent } from './admin-dashboard-reports/admin-dashboard-reports.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        children: [
          {
            path: '',
            component: AdminDashboardItemsComponent,
          },
          {
            path: 'event-management',
            component: AdminDashboardEventManagementComponent,
          },
          {
            path: 'event-analytics',
            component: AdminDashboardEventAnalyticsComponent,
          },
          {
            path: 'registrations',
            component: AdminDashboardRegistrationsComponent,
          },
          {
            path: 'attendance',
            component: AdminDashboardAttendanceComponent,
          },
          { path: 'notifications', component: AdminNotificationsComponent },
          {
            path: 'feedback',
            component: AdminDashboardFeedbackComponent,
          },
          {
            path: 'reports',
            component: AdminDashboardReportsComponent,
          },
          // {
          //   path: 'event',
          //   children: [
          //     {
          //       path: ':id/attendance',
          //       component: EventAttendanceComponent,
          //     },
          //     {
          //       path: 'create',
          //       component: EventCreateComponent,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
