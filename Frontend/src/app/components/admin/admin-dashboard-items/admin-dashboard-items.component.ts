import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from '../../../model/admin/Items';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard-items',
  templateUrl: './admin-dashboard-items.component.html',
  styleUrl: './admin-dashboard-items.component.scss',
})
export class AdminDashboardItemsComponent {
  dashboardData: Items | null = null;

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAdminDashboardItems().subscribe((data) => {
      this.dashboardData = data;
    });
  }
  navigateToEventDetail(eventId: number): void {
    this.router.navigate([`/admin/event-management/${eventId}`]);
  }
}
