import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { EventAttendanceComponent } from '../events/event-attendance/event-attendance.component';
import { EventCreateComponent } from '../events/event-create/event-create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'notifications', component: AdminNotificationsComponent },
    ],
  },
  {
    path: 'events',
    children: [
      { path: '', component: AdminEventsComponent },
      {
        path: ':id/attendance',
        component: EventAttendanceComponent,
      },
      {
        path: 'create',
        component: EventCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
