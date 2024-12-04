import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Normal User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
    },
  ];

  private currentUser!: { id: number; email: string; role: string } | null;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // Login with email
  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUser = { id: user.id, email: user.email, role: user.role };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
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

    this.users.push({ id: 7, name, email, password, role });
    this.currentUser = { id: 7, email, role };
    console.log('User registered successfully:', name);

    // Store the user data in local storage
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.router.navigate([role === 'admin' ? '/admin' : '/user']);
    return 'Registration successful';
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    // Remove user data from local storage
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  // Get the current logged-in user's role
  getCurrentUserRole(): 'admin' | 'user' | 'guest' {
    return this.currentUser
      ? (this.currentUser.role as 'admin' | 'user' | 'guest')
      : 'guest';
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

  getCurrentUser() {
    return this.currentUser || { id: 0, email: '', role: 'guest' };
  }
}
