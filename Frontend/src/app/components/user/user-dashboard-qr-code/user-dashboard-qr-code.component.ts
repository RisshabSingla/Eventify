import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { EventQRCode } from '../../../model/user/QRCode';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-dashboard-qr-code',
  templateUrl: './user-dashboard-qr-code.component.html',
  styleUrl: './user-dashboard-qr-code.component.scss',
})
export class UserDashboardQrCodeComponent implements OnInit {
  todaysEvents!: EventQRCode[];

  overlayData = {
    visible: false,
    title: '',
    type: '',
    qrCode: '',
    code: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserQREvents().subscribe((events: EventQRCode[]) => {
      console.log(events);
      this.todaysEvents = events;
    });
  }

  // Show QR code overlay
  async showQRCode(event: EventQRCode) {
    try {
      const qrData = event.attendanceCode;
      const qrCodeUrl = await QRCode.toDataURL(qrData);
      this.overlayData = {
        visible: true,
        title: `QR Code for ${event.name}`,
        type: 'qr',
        qrCode: qrCodeUrl,
        code: event.attendanceCode,
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  // Show manual code overlay
  showManualCode(event: EventQRCode) {
    this.overlayData = {
      visible: true,
      title: `Manual Code for ${event.name}`,
      type: 'manual',
      qrCode: '',
      code: event.attendanceCode,
    };
  }

  // Close overlay
  closeOverlay() {
    this.overlayData.visible = false;
  }
}
