import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      name: 'Normal User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
    },
  ];

  constructor(private router: Router, private navbarService: NavbarService) {}

  // Login with email
  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.navbarService.setRole(user.role as 'admin' | 'user');
      this.router.navigate([user.role === 'admin' ? '/admin' : '/user']);
      return true;
    }
    return false;
  }

  // Register with name, email, password, and role
  register(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user'
  ): string {
    const userExists = this.users.some((u) => u.email === email);
    if (userExists) {
      return 'User already exists with this email';
    }

    this.users.push({ name, email, password, role });
    console.log('User registered successfully:', name);

    this.navbarService.setRole(role);
    this.router.navigate([role === 'admin' ? '/admin' : '/user']);

    return 'Registration successful';
  }

  // Logout
  logout(): void {
    this.navbarService.setRole('guest');
    this.router.navigate(['/login']);
  }

  // Reset password by email
  resetPassword(email: string): boolean {
    const user = this.users.find((u) => u.email === email);
    if (user) {
      // Simulate sending a reset link
      console.log(`Reset link sent to ${email}`);
      return true;
    } else {
      console.error('Email not found');
      return false;
    }
  }
}
