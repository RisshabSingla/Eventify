import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { EventService } from '../../../services/event.service';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  user: 'guest' | 'user' | 'admin' = 'guest';
  events$!: Observable<Event[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUserRole();
    this.events$ = this.eventService.getAllEvents();
  }

  navigateToEvent(eventId: number): void {
    if (this.user === 'guest') {
      this.router.navigate(['/events', eventId]);
    } else {
      this.router.navigate(['/user/explore/', eventId]);
    }
  }
}
