import { Component, OnInit } from '@angular/core';
import {
  UserDetail,
  UserEventSummary,
  UserStats,
} from '../../../model/user/Items';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-dashboard-items',
  templateUrl: './user-dashboard-items.component.html',
  styleUrl: './user-dashboard-items.component.scss',
})
export class UserDashboardItemsComponent implements OnInit {
  userDetails!: UserDetail;
  userEventSummary!: UserEventSummary;
  userNotifications!: string[];
  userStats!: UserStats;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getDashBoardItems().subscribe((data) => {
      this.userDetails = data.userDetails;
      this.userEventSummary = data.userEventSummary;
      this.userNotifications = data.userNotifications;
      this.userStats = data.userStats;
    });
  }
}
