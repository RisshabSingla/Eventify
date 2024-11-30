import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NavbarService } from '../../../../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrl: './user-nav-bar.component.scss',
})
export class UserNavBarComponent {
  isMenuOpen = false;
  currentRole: 'admin' | 'user' | 'guest' = 'guest';

  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRole = this.navbarService.getRole();
  }

  // Logout the user and redirect to the login page
  logout() {
    this.authService.logout();
    this.navbarService.setRole('guest');
    this.router.navigate(['/auth/login']);
  }

  // Toggle the sidebar menu for mobile view
  toggleSidebar() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
