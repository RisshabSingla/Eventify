import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNotification } from '../../../model/admin/Notifications';
import { AdminService } from '../../../services/admin.service';
import { Admin_Event_Details } from '../../../model/admin/Admin_Event_Details';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrl: './admin-notifications.component.scss',
})
export class AdminNotificationsComponent implements OnInit {
  notifications: AdminNotification[] = [];

  events: Admin_Event_Details[] = [];

  notificationType: string = 'All';
  selectedEvent: string = '';
  isModalOpen: boolean = false;
  notificationText: string = '';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadEventNames();
  }

  loadEventNames() {
    this.adminService.getEventNames().subscribe((data) => {
      this.events = data;
    });
  }

  loadNotifications(): void {
    this.adminService.getNotifications().subscribe((data) => {
      this.notifications = data.sort((a: any, b: any) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    });
  }

  openNotificationModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  pushNotification() {
    this.notificationService
      .sendNotification(
        this.notificationType,
        this.selectedEvent,
        this.notificationText
      )
      .subscribe((data: string) => {
        alert('Notification Sent');
        console.log(data);
      });
    this.closeModal();
  }
}
