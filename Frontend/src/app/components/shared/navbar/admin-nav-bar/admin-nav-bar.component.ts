import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.scss',
})
export class AdminNavBarComponent {
  isMenuOpen = false;
  currentRole: 'admin' | 'user' | 'guest' = 'guest';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentRole = this.authService.getCurrentUserRole();
  }

  // Logout the user and redirect to the login page
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Toggle the sidebar menu for mobile view
  toggleSidebar() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
