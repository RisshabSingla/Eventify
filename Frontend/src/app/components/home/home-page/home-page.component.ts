import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
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
}
