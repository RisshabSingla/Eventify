import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  upcomingEvents = [
    {
      name: 'Tech Conference 2024',
      date: '15th December 2024',
      location: 'New York',
    },
    { name: 'AI Workshop', date: '10th January 2025', location: 'Los Angeles' },
    {
      name: 'Design Sprint',
      date: '25th February 2025',
      location: 'San Francisco',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getCurrentUserRole();
    if (role === 'Admin') {
      this.router.navigate(['/admin']);
    }
    if (role === 'User') {
      this.router.navigate(['/user']);
    }
  }
}
