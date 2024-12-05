import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentRole = this.authService.getCurrentUserRole();
    if (currentRole !== 'Guest') {
      this.router.navigate([currentRole === 'Admin' ? '/admin' : '/user']);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again later.';
      }
    );
  }
}
