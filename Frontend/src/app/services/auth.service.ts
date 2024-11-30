import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
  ];

  constructor(private router: Router, private navbarService: NavbarService) {}

  login(username: string, password: string): boolean {
    console.log(username, password);
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.navbarService.setRole(user.role as 'admin' | 'user');
      this.router.navigate([user.role === 'admin' ? '/admin' : '/user']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.navbarService.setRole('guest');
    this.router.navigate(['/login']);
  }
}
