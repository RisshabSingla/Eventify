import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardItemsComponent } from './user-dashboard-items/user-dashboard-items.component';
import { UserDashboardExploreComponent } from './user-dashboard-explore/user-dashboard-explore.component';
import { UserDashboardRegisteredComponent } from './user-dashboard-registered/user-dashboard-registered.component';
import { UserDashboardQrCodeComponent } from './user-dashboard-qr-code/user-dashboard-qr-code.component';
import { UserDashboardGiveFeedbackComponent } from './user-dashboard-give-feedback/user-dashboard-give-feedback.component';
import { UserDashboardViewFeedbackComponent } from './user-dashboard-view-feedback/user-dashboard-view-feedback.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardItemsComponent,
    UserDashboardExploreComponent,
    UserDashboardRegisteredComponent,
    UserDashboardQrCodeComponent,
    UserDashboardGiveFeedbackComponent,
    UserDashboardViewFeedbackComponent,
  ],
  imports: [CommonModule, UserRoutingModule, FormsModule],
})
export class UserModule {}
