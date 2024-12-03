import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNotification } from '../../../model/admin/Notifications';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrl: './admin-notifications.component.scss',
})
export class AdminNotificationsComponent implements OnInit {
  notifications: AdminNotification[] = [];

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.adminService.getNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }

  pushNewNotification() {
    console.log('New Notification button clicked');
  }
}
