import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEvents } from '../../../model/user/registeredEvents';
import { UserService } from '../../../services/user.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../../services/calendar.service';

@Component({
  selector: 'app-user-dashboard-registered',
  templateUrl: './user-dashboard-registered.component.html',
  styleUrl: './user-dashboard-registered.component.scss',
})
export class UserDashboardRegisteredComponent implements OnInit {
  events!: UserEvents;
  calendar: Calendar | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.userService.getUserEvents().subscribe((data) => {
      this.events = data;
      this.initializeCalendar();
    });
  }

  initializeCalendar() {
    this.calendar = new Calendar(document.getElementById('calendar')!, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: this.getVisibleEvents(),
      eventClick: this.handleEventClick.bind(this),
    });
    this.calendar.render();
  }

  getVisibleEvents() {
    let events = [];
    events.push(...this.mapEvents(this.events.registered, '#fbbf24'));
    return events;
  }

  mapEvents(
    events: {
      id: string;
      name: string;
      date: string; // Corrected to lowercase
      time: string;
      location: string;
      image: string;
      status: string;
    }[],
    color: string
  ) {
    return events.map((event) => ({
      id: event.id.toString(),
      title: event.name,
      start: event.date, // Changed `date` to `start` for FullCalendar compatibility
      backgroundColor: color,
      borderColor: color,
      textColor: '#000000',
    }));
  }

  handleEventClick(info: any) {
    const eventId = info.event.id;
    this.router.navigate(['/user/explore/', eventId]);
  }

  viewEventDetails(event: any) {
    console.log(event);
    this.router.navigate(['/user/explore/', event.id]);
  }

  giveFeedback(event: any) {
    this.router.navigate(['/user/give-feedback/' + event.id]);
  }

  downloadIcal(event: any) {
    console.log(event);

    this.calendarService.downloadIcal(event);
  }
}
