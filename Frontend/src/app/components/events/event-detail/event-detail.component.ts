import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EventDetail } from '../../../model/event/EventDetail';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  eventId = '';
  currentUserRole: 'admin' | 'user' | 'guest' = 'guest';
  event!: EventDetail;
  isUserRegisteredForEvent: boolean = false;

  constructor(
    private _ar: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUserRole();

    const currentUser = this.authService.getCurrentUser();
    const id = currentUser.id;
    this.eventService.getEventDetails(this.eventId, id).subscribe((data) => {
      this.event = data.eventDetails;
      this.isUserRegisteredForEvent = data.isUserRegisteredForEvent;
    });
  }
  navigateToLogin(): void {
    // Navigate to login page for guest users
    this.router.navigate(['/auth/login']);
  }

  registerForEvent(): void {
    // Simulate event registration
    this.isUserRegisteredForEvent = true;
    alert('Registered successfully!');
  }

  cancelRegistration(): void {
    // Simulate canceling the registration
    this.isUserRegisteredForEvent = false;
    alert('Registration canceled!');
  }

  navigateToEditEvent() {
    this.router.navigate(['/admin/event-management/', this.eventId, 'edit']);
  }
}
