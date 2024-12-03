import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-give-feedback',
  templateUrl: './user-dashboard-give-feedback.component.html',
  styleUrl: './user-dashboard-give-feedback.component.scss',
})
export class UserDashboardGiveFeedbackComponent {
  attendedEvents = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-12-03',
      time: '10:00 AM',
      venue: 'Main Auditorium',
      status: 'Present',
    },
    {
      id: 2,
      name: 'Art Workshop',
      date: '2024-12-03',
      time: '2:00 PM',
      venue: 'Art Room 1',
      status: 'Present',
    },
    {
      id: 3,
      name: 'Yoga Class',
      date: '2024-12-03',
      time: '6:00 PM',
      venue: 'Gym Hall',
      status: 'Present',
    },
    {
      id: 4,
      name: 'Music Festival',
      date: '2024-12-04',
      time: '9:00 AM',
      venue: 'Open Arena',
      status: 'Present',
    },
    {
      id: 5,
      name: 'Photography Seminar',
      date: '2024-12-05',
      time: '1:00 PM',
      venue: 'Conference Room A',
      status: 'Present',
    },
    {
      id: 6,
      name: 'Cooking Class',
      date: '2024-12-06',
      time: '3:00 PM',
      venue: 'Kitchen Lab',
      status: 'Present',
    },
    {
      id: 7,
      name: 'Business Strategy Workshop',
      date: '2024-12-07',
      time: '4:00 PM',
      venue: 'Meeting Room 1',
      status: 'Present',
    },
    {
      id: 8,
      name: 'Digital Marketing Seminar',
      date: '2024-12-08',
      time: '5:00 PM',
      venue: 'Seminar Hall',
      status: 'Present',
    },
    {
      id: 9,
      name: 'Graphic Design Course',
      date: '2024-12-09',
      time: '11:00 AM',
      venue: 'Art Room 2',
      status: 'Present',
    },
    {
      id: 10,
      name: 'Creative Writing Workshop',
      date: '2024-12-10',
      time: '7:00 PM',
      venue: 'Library Hall',
      status: 'Present',
    },
    {
      id: 11,
      name: 'AI for Beginners',
      date: '2024-12-11',
      time: '9:30 AM',
      venue: 'Tech Hub',
      status: 'Present',
    },
    {
      id: 12,
      name: 'Web Development Bootcamp',
      date: '2024-12-12',
      time: '10:00 AM',
      venue: 'Room 302',
      status: 'Present',
    },
    {
      id: 13,
      name: 'Blockchain Workshop',
      date: '2024-12-13',
      time: '12:00 PM',
      venue: 'Room 401',
      status: 'Present',
    },
    {
      id: 14,
      name: 'Data Science Bootcamp',
      date: '2024-12-14',
      time: '1:00 PM',
      venue: 'Tech Lab',
      status: 'Present',
    },
    {
      id: 15,
      name: 'Entrepreneurship Seminar',
      date: '2024-12-15',
      time: '3:30 PM',
      venue: 'Conference Hall',
      status: 'Present',
    },
    {
      id: 16,
      name: 'Graphic Arts Expo',
      date: '2024-12-16',
      time: '4:30 PM',
      venue: 'Expo Center',
      status: 'Present',
    },
    {
      id: 17,
      name: 'Cybersecurity Basics',
      date: '2024-12-17',
      time: '2:00 PM',
      venue: 'Security Lab',
      status: 'Present',
    },
    {
      id: 18,
      name: 'Digital Illustration Workshop',
      date: '2024-12-18',
      time: '10:00 AM',
      venue: 'Creative Studio',
      status: 'Present',
    },
    {
      id: 19,
      name: 'Startup Ideas Pitching',
      date: '2024-12-19',
      time: '11:30 AM',
      venue: 'Innovation Center',
      status: 'Present',
    },
    {
      id: 20,
      name: 'App Development Bootcamp',
      date: '2024-12-20',
      time: '12:30 PM',
      venue: 'Room 503',
      status: 'Present',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Navigate to the feedback form for the selected event
  navigateToFeedbackForm(eventId: number) {
    this.router.navigate(['user/give-feedback/' + eventId]);
  }
}
