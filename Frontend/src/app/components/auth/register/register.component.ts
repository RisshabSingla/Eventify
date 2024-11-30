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
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    const result = this.authService.register(
      this.name,
      this.email,
      this.password,
      this.role
    );

    if (result === 'User already exists with this email') {
      this.errorMessage = result;
      this.successMessage = '';
    } else if (result === 'Registration successful') {
      this.successMessage = result;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Registration failed, please try again.';
      this.successMessage = '';
    }
  }
}
