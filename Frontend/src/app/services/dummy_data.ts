import { EventAnalytics } from '../model/admin/Event_Analytics';
import { EventAttendance } from '../model/admin/Event_Attendance';

export const DUMMY_EVENTS_DATA = [
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

export const ADMIN_DASHBOARD_DATA = {
  metrics: [
    { title: 'Total Users', value: 1234 },
    { title: 'Total Events', value: 87 },
    { title: 'Registrations Today', value: 45 },
  ],
  upcomingEvents: [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-05-01',
      time: '10:00 AM',
    },
    {
      id: 2,
      name: 'Web Development Workshop',
      date: '2024-06-15',
      time: '2:00 PM',
    },
    {
      id: 3,
      name: 'AI & Machine Learning Seminar',
      date: '2024-07-20',
      time: '9:00 AM',
    },
  ],

  recentActivities: [
    {
      description: 'New Event Created',
      detail: 'React Workshop',
      timestamp: 'Dec 1, 2024 · 1:00 PM',
    },
    {
      description: 'User Registration',
      detail: 'John Doe',
      timestamp: 'Dec 1, 2024 · 11:30 AM',
    },
    {
      description: 'Feedback Submitted',
      detail: 'Great Event!',
      timestamp: 'Dec 1, 2024 · 10:00 AM',
    },
  ],
};

export const ADMIN_DASHBOARD_EVENT_MANAGEMENT_DATA = {
  createdByAdminEvents: [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-12-10',
      description:
        'A tech conference focusing on the latest innovations in AI and cloud technologies.',
    },
    {
      id: 2,
      name: 'AI Workshop',
      date: '2024-12-15',
      description:
        'A hands-on workshop to learn about AI and machine learning techniques.',
    },
    {
      id: 3,
      name: 'Hackathon',
      date: '2024-12-20',
      description:
        'A 24-hour event where developers collaborate to solve challenges and create innovative solutions.',
    },
    {
      id: 4,
      name: 'Angular Masterclass',
      date: '2024-12-22',
      description:
        'A masterclass focused on advanced Angular concepts and practical applications.',
    },
    {
      id: 5,
      name: 'Cloud Summit',
      date: '2025-01-05',
      description:
        'A summit to explore the latest trends in cloud computing and technologies.',
    },
  ],
  allEvents: [
    {
      id: 6,
      name: 'Social Meetup',
      date: '2024-12-05',
      description:
        'A casual social event to meet other professionals in the tech industry.',
    },
    {
      id: 7,
      name: 'Webinar on JavaScript',
      date: '2024-12-12',
      description:
        'An online webinar discussing the future of JavaScript and new features.',
    },
    {
      id: 8,
      name: 'Python Bootcamp',
      date: '2024-12-18',
      description:
        'A bootcamp designed for beginners to get hands-on experience with Python programming.',
    },
    {
      id: 9,
      name: 'Networking Event',
      date: '2024-12-22',
      description: 'An event where professionals can connect and share ideas.',
    },
    {
      id: 10,
      name: 'React Summit',
      date: '2025-01-10',
      description:
        'A summit bringing together React developers to learn and network.',
    },
    {
      id: 11,
      name: 'Data Science Workshop',
      date: '2025-01-15',
      description:
        'A workshop where data scientists discuss data trends and techniques.',
    },
  ],
};

export const ADMIN_DASHBOARD_EVENT_ANALYTICS_DATA: EventAnalytics = {
  metrics: {
    totalCreatedEvents: 5,
    totalRegisteredUsers: 150,
    totalAttendedUsers: 120,
    averageFeedbackRating: 4.3,
  },
  events: [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-12-10',
      description:
        'A premier conference exploring the latest in technology advancements.',
    },
    {
      id: 2,
      name: 'AI Workshop',
      date: '2024-12-15',
      description:
        'Hands-on workshop focusing on AI and machine learning techniques.',
    },
    {
      id: 3,
      name: 'Hackathon',
      date: '2024-12-20',
      description:
        'Collaborative coding competition to solve innovative challenges.',
    },
    {
      id: 4,
      name: 'Angular Masterclass',
      date: '2024-12-22',
      description: 'Deep dive into Angular framework with expert instructors.',
    },
    {
      id: 5,
      name: 'Cloud Summit',
      date: '2025-01-05',
      description:
        'A summit showcasing the future of cloud computing technologies.',
    },
  ],
};

export const ADMIN_DASHBOARD_EVENT_ATTENDANCE_DATA: EventAttendance = {
  metrics: {
    totalRegisteredUsers: 500,
    totalAttendedUsers: 400,
    attendanceRate: 80, // in percentage
    totalNoShowUsers: 100,
  },
  events: [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-12-10',
      description:
        'An annual tech conference bringing together technology enthusiasts, industry leaders, and innovators to discuss the latest trends in the tech world.',
    },
    {
      id: 2,
      name: 'AI Workshop',
      date: '2024-12-15',
      description:
        'A hands-on workshop on Artificial Intelligence, covering topics from foundational concepts to advanced techniques.',
    },
    {
      id: 3,
      name: 'Hackathon',
      date: '2024-12-20',
      description:
        'A 24-hour coding marathon for developers, designers, and innovators to build and showcase innovative projects.',
    },
    {
      id: 4,
      name: 'Angular Masterclass',
      date: '2024-12-22',
      description:
        'A comprehensive masterclass on Angular framework, focusing on building dynamic, single-page applications.',
    },
    {
      id: 5,
      name: 'Cloud Summit',
      date: '2025-01-05',
      description:
        'A summit exploring the future of cloud computing, featuring industry experts and interactive sessions.',
    },
  ],
};
