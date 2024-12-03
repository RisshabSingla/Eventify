import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventAttendanceComponent } from './event-attendance/event-attendance.component';
import { EventQrCodeComponent } from './event-qr-code/event-qr-code.component';
import { EventAttendeeListComponent } from './event-attendee-list/event-attendee-list.component';
import { EventAnalyticsComponent } from './event-analytics/event-analytics.component';
import { EventFeedbackComponent } from './event-feedback/event-feedback.component';
import { EventReportComponent } from './event-report/event-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EventEditComponent } from './event-edit/event-edit.component';

@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent,
    EventCreateComponent,
    EventAttendanceComponent,
    EventQrCodeComponent,
    EventAttendeeListComponent,
    EventAnalyticsComponent,
    EventFeedbackComponent,
    EventReportComponent,
    EventEditComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ZXingScannerModule,
  ],
})
export class EventsModule {}
