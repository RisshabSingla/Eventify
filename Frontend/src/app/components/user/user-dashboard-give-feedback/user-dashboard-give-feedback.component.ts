import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventGiveFeedback } from '../../../model/user/giveFeedback';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-dashboard-give-feedback',
  templateUrl: './user-dashboard-give-feedback.component.html',
  styleUrl: './user-dashboard-give-feedback.component.scss',
})
export class UserDashboardGiveFeedbackComponent {
  attendedEvents!: EventGiveFeedback[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserGiveFeedback()
      .subscribe((data: EventGiveFeedback[]) => {
        this.attendedEvents = data;
      });
  }

  // Navigate to the feedback form for the selected event
  navigateToFeedbackForm(eventId: number) {
    this.router.navigate(['user/give-feedback/' + eventId]);
  }
}
