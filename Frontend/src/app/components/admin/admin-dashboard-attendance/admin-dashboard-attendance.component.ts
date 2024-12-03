import { Component, OnInit } from '@angular/core';
import {
  attendanceMetrics,
  EventAttendance,
} from '../../../model/admin/Event_Attendance';
import { Event } from '../../../model/admin/Event_Management';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard-attendance',
  templateUrl: './admin-dashboard-attendance.component.html',
  styleUrl: './admin-dashboard-attendance.component.scss',
})
export class AdminDashboardAttendanceComponent implements OnInit {
  metrics!: attendanceMetrics;
  events: Event[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getEventAttendanceData()
      .subscribe((data: EventAttendance) => {
        this.metrics = data.metrics;
        this.events = data.events;
      });
  }
  downloadAttendance() {
    alert('Attendance for all events downloaded!');
  }
}
