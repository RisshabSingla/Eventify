import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  events = [
    {
      id: 1,
      title: 'TechFest India 2024',
      description:
        'A leading technology conference featuring AI and cloud computing.',
      date: 'Dec 25, 2024',
      location: 'Bengaluru, Karnataka',
      image: 'https://picsum.photos/400/200?random=1',
    },
    {
      id: 2,
      title: 'Cultural Fiesta',
      description: 'A grand celebration of India’s rich cultural heritage.',
      date: 'Jan 15, 2025',
      location: 'Jaipur, Rajasthan',
      image: 'https://picsum.photos/400/200?random=2',
    },
    {
      id: 3,
      title: 'Startup Conclave',
      description: 'Connect with top Indian startups and investors.',
      date: 'Jan 30, 2025',
      location: 'Hyderabad, Telangana',
      image: 'https://picsum.photos/400/200?random=3',
    },
    {
      id: 4,
      title: 'Music Marathon',
      description: 'Enjoy live performances by renowned Indian artists.',
      date: 'Feb 10, 2025',
      location: 'Mumbai, Maharashtra',
      image: 'https://picsum.photos/400/200?random=4',
    },
    {
      id: 5,
      title: 'Wellness Camp 2025',
      description: 'Rejuvenate at India’s top wellness retreat.',
      date: 'Feb 25, 2025',
      location: 'Rishikesh, Uttarakhand',
      image: 'https://picsum.photos/400/200?random=5',
    },
  ];

  constructor(private router: Router) {}

  navigateToEvent(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }
}
