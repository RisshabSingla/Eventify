import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'admin' | 'user' = 'user';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    const isRegistered = this.authService.register(
      this.name,
      this.email,
      this.password,
      this.role
    );

    if (!isRegistered) {
      this.errorMessage = 'User already exists with this email.';
    }
  }
}
