import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forget.component.html',
  styleUrl: './password-forget.component.scss',
})
export class PasswordForgetComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  resetPassword() {
    if (this.authService.resetPassword(this.email)) {
      this.message = 'A reset link has been sent to your email.';
    } else {
      this.message = 'Email not found. Please check and try again.';
    }
  }
}
