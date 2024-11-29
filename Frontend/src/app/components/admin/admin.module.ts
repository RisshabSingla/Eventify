import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminEventsComponent,
    AdminNotificationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
