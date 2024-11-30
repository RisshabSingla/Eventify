import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventSubscribeComponent } from './event-subscribe/event-subscribe.component';
import { authGuard } from '../../guards/auth.guard';
import { EventQrCodeComponent } from './event-qr-code/event-qr-code.component';
import { EventCategoryComponent } from './event-category/event-category.component';
import { EventAttendeeListComponent } from './event-attendee-list/event-attendee-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EventListComponent },

      { path: ':id', component: EventDetailComponent },
      {
        path: ':id/qr-code',
        component: EventQrCodeComponent,
      },
      {
        path: ':id/attendees',
        component: EventAttendeeListComponent,
      },
      {
        path: ':id/subscribe',
        component: EventSubscribeComponent,
      },
    ],
  },
  {
    path: 'category',
    children: [{ path: ':category', component: EventCategoryComponent }],
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
