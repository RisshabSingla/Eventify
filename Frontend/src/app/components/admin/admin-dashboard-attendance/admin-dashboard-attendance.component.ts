import { Component, OnInit } from '@angular/core';
import {
  attendanceMetrics,
  EventAttendance,
} from '../../../model/admin/Event_Attendance';
import { Event } from '../../../model/admin/Event';
import { AdminService } from '../../../services/admin.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-admin-dashboard-attendance',
  templateUrl: './admin-dashboard-attendance.component.html',
  styleUrl: './admin-dashboard-attendance.component.scss',
})
export class AdminDashboardAttendanceComponent implements OnInit {
  metrics!: attendanceMetrics;
  events: Event[] = [];

  constructor(
    private adminService: AdminService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getEventAttendanceData()
      .subscribe((data: EventAttendance) => {
        this.metrics = data.metrics;
        this.events = data.events;
      });
  }
  downloadAttendance() {
    this.exportService.downloadAttendance().subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        link.href = url;
        link.download = 'attendance.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);

        alert('Attendance for all events downloaded!');
      },
      (error) => {
        console.error('Error downloading the file', error);
        alert('There was an error downloading the attendance file.');
      }
    );
  }

  downloadEventAttendance(eventId: string) {
    alert('Downloading attendance for event ' + eventId);
    this.exportService.downloadAttendanceforEvent(eventId).subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        link.href = url;
        link.download = 'attendance.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);

        alert('Attendance downloaded!');
      },
      (error) => {
        console.error('Error downloading the file', error);
        alert('There was an error downloading the attendance file.');
      }
    );
  }
}
