import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import {
  AttendanceUser,
  EventAttendanceMetrics,
  EventDetails,
} from '../../../model/event/EventAttendance';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.component.html',
  styleUrl: './event-attendance.component.scss',
})
export class EventAttendanceComponent implements OnInit {
  eventId = '';
  currentDate = new Date();
  isManualModalOpen = false;
  isScanModalOpen = false;
  manualCode = '';
  currentDevice: MediaDeviceInfo | undefined;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  @ViewChild('scanner') scanner: ZXingScannerComponent | undefined;

  metrics!: EventAttendanceMetrics;
  users!: AttendanceUser[];
  eventDetails!: EventDetails;
  modalUser!: AttendanceUser;

  constructor(private _ar: ActivatedRoute, private eventService: EventService) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit() {
    this.eventService.getEventAttendanceData(this.eventId).subscribe((data) => {
      this.metrics = data.metrics;
      this.users = data.users;
      this.eventDetails = data.eventDetails;
    });

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      this.currentDevice =
        videoDevices.length > 0 ? videoDevices[0] : undefined;
    });
    this.updateUserStatuses();
  }

  get tableHeaders(): string[] {
    return this.users.length ? Object.keys(this.users[0]) : [];
  }

  isEventToday(): boolean {
    return (
      this.eventDetails.date.toDateString() === this.currentDate.toDateString()
    );
  }

  // Update user statuses based on the event date
  updateUserStatuses() {
    const eventDate = this.eventDetails.date;
    const isToday =
      eventDate.toDateString() === this.currentDate.toDateString();
    const isFuture = eventDate > this.currentDate;
    const isPast = eventDate < this.currentDate;

    this.users.forEach((user) => {
      if (isFuture) {
        user.currentStatus = 'Registered';
        user.attending = '';
      } else if (isToday) {
        user.currentStatus = 'Registered';
      } else if (isPast) {
        user.currentStatus = Math.random() > 0.5 ? 'Attended' : 'Absent';
        user.attending = '';
      }
    });
  }

  markAbsent(user: AttendanceUser) {
    user.attending = 'Absent';
    this.eventService.markAttendanceforUser(this.eventId, user.id, 'Absent');
  }

  openManualModal(user: AttendanceUser) {
    this.modalUser = user;
    this.isManualModalOpen = true;
  }

  // Open modal for QR scanning
  openScanModal(user: AttendanceUser) {
    this.modalUser = user;
    this.isScanModalOpen = true;
  }

  closeManualModal() {
    this.isManualModalOpen = false;
  }

  // Close both modals
  closeQRModal(scanner: ZXingScannerComponent) {
    if (scanner) {
      // Stop the camera
      scanner.scanStop();
    }
    this.isScanModalOpen = false;
  }

  // Handle manual attendance marking
  markAttendanceManual() {
    console.log('Manual Code Submitted: ', this.manualCode);
    if (this.manualCode === this.modalUser.attendanceCode) {
      this.eventService.markAttendanceforUser(
        this.eventId,
        this.modalUser.id,
        'Present'
      );
      this.modalUser.attending = 'Present';
    } else {
      alert('Invalid Code');
    }
    this.closeManualModal();
  }

  // Handle QR code attendance marking
  onScanSuccess(result: string) {
    console.log('QR Code Scanned: ', result);
    if (result === this.modalUser.attendanceCode) {
      this.modalUser.attending = 'Present';
    } else {
      alert('Invalid Code');
    }
    this.isScanModalOpen = false;
  }

  markAttendanceScan(scanner: ZXingScannerComponent) {
    console.log('QR Code Scanned');
    this.closeQRModal(scanner);
  }
}
