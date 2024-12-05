import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  isSidebarOpen = false;
  selectedSection: string = 'dashboard';
  currentRole: 'Admin' | 'User' | 'Guest' = 'Guest';

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
