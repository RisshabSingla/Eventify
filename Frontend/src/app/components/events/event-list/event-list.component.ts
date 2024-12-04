import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { EventDetails } from '../../../model/event/EventDetails';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  user: 'guest' | 'user' | 'admin' = 'guest';
  events: EventDetails[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUserRole();
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: EventDetails[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  navigateToEvent(eventId: number): void {
    if (this.user === 'guest') {
      this.router.navigate(['/events', eventId]);
    } else {
      this.router.navigate(['/user/explore/', eventId]);
    }
  }
}
