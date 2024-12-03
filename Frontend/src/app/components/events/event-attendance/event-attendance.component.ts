import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

interface User {
  [key: string]: string;
  name: string;
  email: string;
  registeredDate: string;
  currentStatus: string;
  attending: string;
}

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

  metrics = {
    capacity: 200,
    filled: 180,
    present: 120,
    yetToCome: 60,
    absent: 20,
  };

  // User List
  users: User[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      registeredDate: '2024-12-01',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      registeredDate: '2024-12-02',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      registeredDate: '2024-12-03',
      currentStatus: 'Absent',
      attending: 'Absent',
    },
    {
      name: 'Alice Brown',
      email: 'alice@example.com',
      registeredDate: '2024-12-04',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Mike Davis',
      email: 'mike@example.com',
      registeredDate: '2024-12-05',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      registeredDate: '2024-12-06',
      currentStatus: 'Absent',
      attending: 'Absent',
    },
    {
      name: 'Chris Taylor',
      email: 'chris@example.com',
      registeredDate: '2024-12-07',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Emma Miller',
      email: 'emma@example.com',
      registeredDate: '2024-12-08',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'David Clark',
      email: 'david@example.com',
      registeredDate: '2024-12-09',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'Olivia Harris',
      email: 'olivia@example.com',
      registeredDate: '2024-12-10',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Liam Martin',
      email: 'liam@example.com',
      registeredDate: '2024-12-11',
      currentStatus: 'Absent',
      attending: 'Absent',
    },
    {
      name: 'Sophia Lee',
      email: 'sophia@example.com',
      registeredDate: '2024-12-12',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'Mason White',
      email: 'mason@example.com',
      registeredDate: '2024-12-13',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Isabella Walker',
      email: 'isabella@example.com',
      registeredDate: '2024-12-14',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'Ethan Hall',
      email: 'ethan@example.com',
      registeredDate: '2024-12-15',
      currentStatus: 'Absent',
      attending: 'Absent',
    },
    {
      name: 'Ava Young',
      email: 'ava@example.com',
      registeredDate: '2024-12-16',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Lucas King',
      email: 'lucas@example.com',
      registeredDate: '2024-12-17',
      currentStatus: 'Registered',
      attending: 'Present',
    },
    {
      name: 'Mia Wright',
      email: 'mia@example.com',
      registeredDate: '2024-12-18',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
    },
    {
      name: 'Noah Green',
      email: 'noah@example.com',
      registeredDate: '2024-12-19',
      currentStatus: 'Absent',
      attending: 'Absent',
    },
    {
      name: 'Charlotte Adams',
      email: 'charlotte@example.com',
      registeredDate: '2024-12-20',
      currentStatus: 'Registered',
      attending: 'Present',
    },
  ];

  eventDetails = {
    name: 'Tech Conference 2024',
    description: 'A conference exploring the latest in technology.',
    venue: 'Grand Tech Hall, NYC',
    date: new Date('2024-12-03'),
  };

  constructor(private _ar: ActivatedRoute) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
    this.updateUserStatuses();
  }

  ngOnInit() {
    // Select the first device or set to undefined if no devices are available
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      this.currentDevice =
        videoDevices.length > 0 ? videoDevices[0] : undefined;
    });
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
        user.attending = 'Yet to Come';
      } else if (isPast) {
        user.currentStatus = Math.random() > 0.5 ? 'Attended' : 'Absent';
        user.attending = '';
      }
    });
  }

  // Placeholder function for marking attendance
  markAttendance(user: any, method: string) {
    if (
      this.eventDetails.date.toDateString() !== this.currentDate.toDateString()
    ) {
      alert('Attendance can only be marked on the day of the event.');
      return;
    }

    if (method === 'manual') {
      console.log(`Marking attendance manually for: ${user.name}`);
    } else if (method === 'scan') {
      console.log(`Opening QR scanner for: ${user.name}`);
    }

    user.attending = 'Present';
  }

  markAbsent(user: User) {
    user.attending = 'Absent';
  }

  openManualModal(user: any) {
    this.isManualModalOpen = true;
  }

  // Open modal for QR scanning
  openScanModal(user: any) {
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
    this.updateUserStatus('Present', this.manualCode);
    this.closeManualModal();
  }

  // Handle QR code attendance marking (Placeholder)
  onScanSuccess(result: string) {
    console.log('QR Code Scanned: ', result);
    this.updateUserStatus('Present', result);
    this.isScanModalOpen = false;
  }

  markAttendanceScan(scanner: ZXingScannerComponent) {
    console.log('QR Code Scanned');
    this.closeQRModal(scanner);
  }

  updateUserStatus(status: string, code: string) {
    const user = this.users.find((u) => u.name === 'John Doe');
    if (user) {
      user.attending = status;
      user.currentStatus = `Attended (Code: ${code})`;
    }
  }
}
