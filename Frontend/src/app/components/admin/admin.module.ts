import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { AdminDashboardItemsComponent } from './admin-dashboard-items/admin-dashboard-items.component';
import { AdminDashboardFeedbackComponent } from './admin-dashboard-feedback/admin-dashboard-feedback.component';
import { AdminDashboardReportsComponent } from './admin-dashboard-reports/admin-dashboard-reports.component';
import { AdminDashboardEventManagementComponent } from './admin-dashboard-event-management/admin-dashboard-event-management.component';
import { AdminDashboardEventAnalyticsComponent } from './admin-dashboard-event-analytics/admin-dashboard-event-analytics.component';
import { AdminDashboardAttendanceComponent } from './admin-dashboard-attendance/admin-dashboard-attendance.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNotificationsComponent,
    AdminDashboardItemsComponent,
    AdminDashboardFeedbackComponent,
    AdminDashboardReportsComponent,
    AdminDashboardEventManagementComponent,
    AdminDashboardEventAnalyticsComponent,
    AdminDashboardAttendanceComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
