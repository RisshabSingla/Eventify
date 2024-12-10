import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventManagement } from '../../../model/admin/Event_Management';
import { Event } from '../../../model/admin/Event';
import { AdminService } from '../../../services/admin.service';

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

  createdByAdminEvents: Event[] = [];
  allEvents: Event[] = [];

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.fetchAdminDashboardData();
  }

  fetchAdminDashboardData() {
    this.adminService
      .getEventManagementData()
      .subscribe((data: EventManagement) => {
        this.createdByAdminEvents = data.createdByAdminEvents;
        this.allEvents = data.allEvents;

        this.initializeCalendar();
      });
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  createEvent() {
    this.router.navigate(['/admin/event-management/create']);
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
    events: { id: string; name: string; date: string }[],
    color: string
  ) {
    return events.map((event) => ({
      id: event.id,
      title: event.name,
      date: event.date,
      backgroundColor: color,
      borderColor: color,
      textColor: '#000000',
    }));
  }
}
