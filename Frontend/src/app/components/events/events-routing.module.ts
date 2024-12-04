import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { authGuard } from '../../guards/auth.guard';
import { EventAttendeeListComponent } from './event-attendee-list/event-attendee-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EventListComponent },

      { path: ':id', component: EventDetailComponent },
      {
        path: ':id/attendees',
        component: EventAttendeeListComponent,
      },
    ],
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('../feedback/feedback.module').then((m) => m.FeedbackModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
