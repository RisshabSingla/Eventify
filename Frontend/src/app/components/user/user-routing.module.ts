import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardRegisteredComponent } from './user-dashboard-registered/user-dashboard-registered.component';
import { UserDashboardExploreComponent } from './user-dashboard-explore/user-dashboard-explore.component';
import { UserDashboardUpcomingComponent } from './user-dashboard-upcoming/user-dashboard-upcoming.component';
import { UserDashboardQrCodeComponent } from './user-dashboard-qr-code/user-dashboard-qr-code.component';
import { UserDashboardGiveFeedbackComponent } from './user-dashboard-give-feedback/user-dashboard-give-feedback.component';
import { UserDashboardViewFeedbackComponent } from './user-dashboard-view-feedback/user-dashboard-view-feedback.component';
import { UserDashboardItemsComponent } from './user-dashboard-items/user-dashboard-items.component';
import { EventListComponent } from '../events/event-list/event-list.component';
import { EventDetailComponent } from '../events/event-detail/event-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      { path: '', component: UserDashboardItemsComponent },
      {
        path: 'explore',
        children: [
          {
            path: '',
            component: EventListComponent,
          },
          { path: ':id', component: EventDetailComponent },
        ],
      },
      { path: 'registered', component: UserDashboardRegisteredComponent },
      { path: 'upcoming', component: UserDashboardUpcomingComponent },
      { path: 'qr-code', component: UserDashboardQrCodeComponent },
      { path: 'give-feedback', component: UserDashboardGiveFeedbackComponent },
      { path: 'view-feedback', component: UserDashboardViewFeedbackComponent },
      {
        path: 'event',
        loadChildren: () =>
          import('../events/events.module').then((m) => m.EventsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
