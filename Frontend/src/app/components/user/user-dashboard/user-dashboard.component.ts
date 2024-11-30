import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  isSidebarOpen = false; // Sidebar visibility state
  selectedSection: string = 'dashboard'; // Default section
  currentRole: 'admin' | 'user' | 'guest' = 'guest'; // Default role

  // Boolean to check if the screen is small
  isSmallScreen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentRole = this.authService.getCurrentUserRole();
    this.checkScreenSize();
  }

  // HostListener for resizing the window
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    // Checks if the screen width is less than 768px (mobile view)
    this.isSmallScreen = window.innerWidth < 768;
  }

  // Toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Select the section to display in the main content area
  selectSection(section: string) {
    this.selectedSection = section;
  }

  // Logout function
  logout() {
    this.authService.logout();
  }
}
