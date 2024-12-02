import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-admin-dashboard-event-management',
  templateUrl: './admin-dashboard-event-management.component.html',
  styleUrl: './admin-dashboard-event-management.component.scss',
})
export class AdminDashboardEventManagementComponent implements OnInit {
  isSmallScreen: boolean = false;
  calendar: Calendar | undefined;
  showAllEvents = true;
  showAdminEvents = true;

  createdByAdminEvents = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-12-10' },
    { id: 2, name: 'AI Workshop', date: '2024-12-15' },
    { id: 3, name: 'Hackathon', date: '2024-12-20' },
    { id: 4, name: 'Angular Masterclass', date: '2024-12-22' },
    { id: 5, name: 'Cloud Summit', date: '2025-01-05' },
  ];

  // Dummy data for all events
  allEvents = [
    { id: 6, name: 'Social Meetup', date: '2024-12-05' },
    { id: 7, name: 'Webinar on JavaScript', date: '2024-12-12' },
    { id: 8, name: 'Python Bootcamp', date: '2024-12-18' },
    { id: 9, name: 'Networking Event', date: '2024-12-22' },
    { id: 10, name: 'React Summit', date: '2025-01-10' },
    { id: 11, name: 'Data Science Workshop', date: '2025-01-15' },
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  constructor(private router: Router) {}

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  createEvent() {
    this.router.navigate(['/admin/event-management/create']);
  }

  ngAfterViewInit() {
    this.initializeCalendar();
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

  handleEventClick(info: any) {
    const eventId = info.event.id;
    this.router.navigate(['/admin/event-management', eventId]);
  }

  updateEventVisibility() {
    if (this.calendar) {
      this.calendar.removeAllEvents();
      this.calendar.addEventSource(this.getVisibleEvents());
    }
  }

  getVisibleEvents() {
    let events = [];
    if (this.showAllEvents) {
      events.push(...this.mapEvents(this.allEvents, '#fbbf24'));
    }
    if (this.showAdminEvents) {
      events.push(...this.mapEvents(this.createdByAdminEvents, '#38bdf8'));
    }
    return events;
  }

  // Utility function to map `name` to `title`
  mapEvents(
    events: { id: number; name: string; date: string }[],
    color: string
  ) {
    return events.map((event) => ({
      id: event.id.toString(),
      title: event.name,
      date: event.date,
      backgroundColor: color,
      borderColor: color,
      textColor: '#000000',
    }));
  }
}
