import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-user-dashboard-qr-code',
  templateUrl: './user-dashboard-qr-code.component.html',
  styleUrl: './user-dashboard-qr-code.component.scss',
})
export class UserDashboardQrCodeComponent implements OnInit {
  todaysEvents = [
    {
      name: 'Tech Conference 2024',
      date: '2024-12-03',
      time: '10:00 AM',
      venue: 'Main Auditorium',
      status: 'Not Marked',
    },
    {
      name: 'Art Workshop',
      date: '2024-12-03',
      time: '2:00 PM',
      venue: 'Art Room 1',
      status: 'Present',
    },
    {
      name: 'Yoga Class',
      date: '2024-12-03',
      time: '6:00 PM',
      venue: 'Gym Hall',
      status: 'Not Marked',
    },
  ];

  // Overlay data
  overlayData = {
    visible: false,
    title: '',
    type: '', // 'qr' or 'manual'
    qrCode: '',
    code: '',
  };

  ngOnInit(): void {}

  // Show QR code overlay
  async showQRCode(event: any) {
    try {
      const qrData = `${event.name} - ${event.date} - ${event.time}`;
      const qrCodeUrl = await QRCode.toDataURL(qrData);
      this.overlayData = {
        visible: true,
        title: `QR Code for ${event.name}`,
        type: 'qr',
        qrCode: qrCodeUrl,
        code: '',
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  // Show manual code overlay
  showManualCode(event: any) {
    this.overlayData = {
      visible: true,
      title: `Manual Code for ${event.name}`,
      type: 'manual',
      qrCode: '',
      code: 'ABC123XYZ',
    };
  }

  // Close overlay
  closeOverlay() {
    this.overlayData.visible = false;
  }
}
