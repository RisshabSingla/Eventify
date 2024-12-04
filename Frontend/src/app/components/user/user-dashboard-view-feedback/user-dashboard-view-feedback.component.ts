import { Component, OnInit } from '@angular/core';
import { UserFeedback } from '../../../model/user/viewFeedback';
import { UserService } from '../../../services/user.service';
import { EventFeedback } from '../../../model/admin/Event_Feedback';

@Component({
  selector: 'app-user-dashboard-view-feedback',
  templateUrl: './user-dashboard-view-feedback.component.html',
  styleUrl: './user-dashboard-view-feedback.component.scss',
})
export class UserDashboardViewFeedbackComponent implements OnInit {
  feedbacks!: UserFeedback[];

  isOverlayOpen = false;
  selectedFeedback: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserViewFeedback().subscribe((data: UserFeedback[]) => {
      this.feedbacks = data;
    });
  }

  // Open overlay with selected feedback details
  openFeedbackOverlay(feedback: any) {
    this.selectedFeedback = feedback;
    this.isOverlayOpen = true;
  }

  // Close the overlay
  closeFeedbackOverlay() {
    this.isOverlayOpen = false;
    this.selectedFeedback = null;
  }
}
