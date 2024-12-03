import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-registered',
  templateUrl: './user-dashboard-registered.component.html',
  styleUrl: './user-dashboard-registered.component.scss',
})
export class UserDashboardRegisteredComponent {
  events = {
    registered: [
      {
        id: 1,
        name: 'Tech Conference 2024',
        date: '2024-12-15',
        time: '10:00 AM',
        location: 'New York, NY',
        image: 'https://via.placeholder.com/150',
        status: 'Registered',
      },
      {
        id: 2,
        name: 'React Workshop',
        date: '2024-12-20',
        time: '2:00 PM',
        location: 'San Francisco, CA',
        image: 'https://via.placeholder.com/150',
        status: 'Registered',
      },
      {
        id: 3,
        name: 'Frontend Dev Meetup',
        date: '2024-12-10',
        time: '4:00 PM',
        location: 'Los Angeles, CA',
        image: 'https://via.placeholder.com/150',
        status: 'Registered',
      },
      {
        id: 4,
        name: 'Blockchain Expo',
        date: '2024-12-18',
        time: '1:00 PM',
        location: 'Chicago, IL',
        image: 'https://via.placeholder.com/150',
        status: 'Registered',
      },
      {
        id: 5,
        name: 'AI for Beginners',
        date: '2024-12-22',
        time: '3:00 PM',
        location: 'Austin, TX',
        image: 'https://via.placeholder.com/150',
        status: 'Registered',
      },
    ],
    attended: [
      {
        id: 6,
        name: 'AI Symposium',
        date: '2024-11-10',
        time: '9:00 AM',
        location: 'Online',
        image: 'https://via.placeholder.com/150',
        status: 'Attended',
      },
      {
        id: 7,
        name: 'JavaScript Advanced',
        date: '2024-11-25',
        time: '6:00 PM',
        location: 'Seattle, WA',
        image: 'https://via.placeholder.com/150',
        status: 'Attended',
      },
      {
        id: 8,
        name: 'Cybersecurity 101',
        date: '2024-11-20',
        time: '11:00 AM',
        location: 'Dallas, TX',
        image: 'https://via.placeholder.com/150',
        status: 'Attended',
      },
      {
        id: 9,
        name: 'React Bootcamp',
        date: '2024-10-15',
        time: '10:00 AM',
        location: 'Denver, CO',
        image: 'https://via.placeholder.com/150',
        status: 'Attended',
      },
      {
        id: 10,
        name: 'Cloud Computing Conference',
        date: '2024-09-28',
        time: '2:00 PM',
        location: 'Miami, FL',
        image: 'https://via.placeholder.com/150',
        status: 'Attended',
      },
    ],
    absent: [
      {
        id: 11,
        name: 'Machine Learning Meetup',
        date: '2024-10-05',
        time: '5:00 PM',
        location: 'Los Angeles, CA',
        image: 'https://via.placeholder.com/150',
        status: 'Absent',
      },
      {
        id: 12,
        name: 'AI for Healthcare',
        date: '2024-11-12',
        time: '9:00 AM',
        location: 'Boston, MA',
        image: 'https://via.placeholder.com/150',
        status: 'Absent',
      },
      {
        id: 13,
        name: 'Frontend Web Design Workshop',
        date: '2024-08-25',
        time: '1:00 PM',
        location: 'New York, NY',
        image: 'https://via.placeholder.com/150',
        status: 'Absent',
      },
      {
        id: 14,
        name: 'Cloud Architecture Masterclass',
        date: '2024-07-30',
        time: '4:00 PM',
        location: 'San Francisco, CA',
        image: 'https://via.placeholder.com/150',
        status: 'Absent',
      },
      {
        id: 15,
        name: 'DevOps Summit 2024',
        date: '2024-09-10',
        time: '10:00 AM',
        location: 'Chicago, IL',
        image: 'https://via.placeholder.com/150',
        status: 'Absent',
      },
    ],
  };

  constructor(private router: Router) {}

  viewEventDetails(event: any) {
    console.log(event);
    this.router.navigate(['/user/explore/', event.id]);
  }

  giveFeedback(event: any) {
    this.router.navigate(['/user/give-feedback/' + event.id]);
  }
}
