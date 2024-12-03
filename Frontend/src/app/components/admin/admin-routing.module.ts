import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { EventAttendanceComponent } from '../events/event-attendance/event-attendance.component';
import { EventCreateComponent } from '../events/event-create/event-create.component';
import { AdminDashboardItemsComponent } from './admin-dashboard-items/admin-dashboard-items.component';
import { AdminDashboardEventManagementComponent } from './admin-dashboard-event-management/admin-dashboard-event-management.component';
import { AdminDashboardEventAnalyticsComponent } from './admin-dashboard-event-analytics/admin-dashboard-event-analytics.component';
import { AdminDashboardAttendanceComponent } from './admin-dashboard-attendance/admin-dashboard-attendance.component';
import { AdminDashboardFeedbackComponent } from './admin-dashboard-feedback/admin-dashboard-feedback.component';
import { AdminDashboardReportsComponent } from './admin-dashboard-reports/admin-dashboard-reports.component';
import { EventDetailComponent } from '../events/event-detail/event-detail.component';
import { EventAnalyticsComponent } from '../events/event-analytics/event-analytics.component';
import { FeedbackViewComponent } from '../feedback/feedback-view/feedback-view.component';
import { EventFeedbackComponent } from '../events/event-feedback/event-feedback.component';
import { EventReportComponent } from '../events/event-report/event-report.component';
import { EventAttendeeListComponent } from '../events/event-attendee-list/event-attendee-list.component';
import { EventEditComponent } from '../events/event-edit/event-edit.component';

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
            children: [
              {
                path: '',
                component: AdminDashboardEventManagementComponent,
              },
              {
                path: 'create',
                component: EventCreateComponent,
              },
              {
                path: ':id',
                component: EventDetailComponent,
              },
              {
                path: ':id/attendees',
                component: EventAttendeeListComponent,
              },
              {
                path: ':id/edit',
                component: EventEditComponent,
              },
            ],
          },
          {
            path: 'event-analytics',
            children: [
              { path: '', component: AdminDashboardEventAnalyticsComponent },
              {
                path: ':id',
                component: EventAnalyticsComponent,
              },
            ],
          },
          {
            path: 'attendance',
            children: [
              { path: '', component: AdminDashboardAttendanceComponent },
              {
                path: ':id',
                component: EventAttendanceComponent,
              },
            ],
          },
          {
            path: 'notifications',
            component: AdminNotificationsComponent,
          },
          {
            path: 'feedback',

            children: [
              { path: '', component: AdminDashboardFeedbackComponent },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    component: EventFeedbackComponent,
                  },
                  { path: ':feedbackId', component: FeedbackViewComponent },
                ],
              },
            ],
          },
          {
            path: 'reports',
            children: [
              {
                path: '',
                component: AdminDashboardReportsComponent,
              },
              {
                path: ':id',
                component: EventReportComponent,
              },
            ],
          },
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
