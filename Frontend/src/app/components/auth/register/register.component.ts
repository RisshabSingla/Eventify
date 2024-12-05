import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'Admin' | 'User' = 'User';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentRole = this.authService.getCurrentUserRole();
    if (currentRole !== 'Guest') {
      this.router.navigate([currentRole === 'Admin' ? '/admin' : '/user']);
    }
  }

  register() {
    this.authService
      .register(this.name, this.email, this.password, this.role)
      .subscribe((result) => {
        console.log(result);
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
      });
  }
}
