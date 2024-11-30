import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    console.log(this.username, this.password);
    const isAuthenticated = this.authService.login(
      this.username,
      this.password
    );
    if (!isAuthenticated) {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
