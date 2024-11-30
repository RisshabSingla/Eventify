import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: 'admin' | 'user' = 'user';

  constructor(private authService: AuthService) {}

  register() {
    if (this.username && this.password) {
      const success = this.authService.register(
        this.username,
        this.password,
        this.role
      );
      if (success) {
        alert('Registration successful!');
      } else {
        alert('Username already exists. Please try another.');
      }
    } else {
      alert('Please fill in all the fields');
    }
  }
}
