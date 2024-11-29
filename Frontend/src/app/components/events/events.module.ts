import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventCategoryComponent } from './event-category/event-category.component';
import { EventSubscribeComponent } from './event-subscribe/event-subscribe.component';
import { EventAttendanceComponent } from './event-attendance/event-attendance.component';
import { EventQrCodeComponent } from './event-qr-code/event-qr-code.component';
import { EventAttendeeListComponent } from './event-attendee-list/event-attendee-list.component';


@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent,
    EventCreateComponent,
    EventCategoryComponent,
    EventSubscribeComponent,
    EventAttendanceComponent,
    EventQrCodeComponent,
    EventAttendeeListComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
