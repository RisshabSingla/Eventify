import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  eventId = '';
  isRegistered: boolean = false;
  event = {
    id: 1,
    title: 'Tech Conference 2024',
    date: '2024-12-12',
    location: 'Grand Convention Center, New York',
    description:
      'Join us for an exciting conference about the latest in tech innovations.',
    agenda: [
      '10:00 AM - Opening Remarks',
      '11:00 AM - Keynote by John Doe',
      '01:00 PM - Networking Lunch',
      '02:00 PM - Breakout Sessions',
    ],
    speakers: [
      { name: 'John Doe', bio: 'Tech Expert' },
      { name: 'Jane Smith', bio: 'AI Specialist' },
    ],
    media: [
      { type: 'image', src: 'https://via.placeholder.com/800x400' },
      { type: 'video', src: 'https://www.w3schools.com/html/movie.mp4' },
    ],
    registrationLimit: 200,
    filledSeats: 150,
  };

  currentUserRole: 'admin' | 'user' | 'guest' = 'guest';
  isUserRegisteredForEvent: boolean = false;

  constructor(
    private _ar: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUserRole();
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
