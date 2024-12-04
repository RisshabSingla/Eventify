import { EventAnalytics } from '../model/admin/Event_Analytics';
import { EventAttendance } from '../model/admin/Event_Attendance';
import { EventFeedback } from '../model/admin/Event_Feedback';
import { EventReports } from '../model/admin/Event_Reports';
import { AdminNotification } from '../model/admin/Notifications';
import { UserDashboardItems } from '../model/user/Items';

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

export const ADMIN_DASHBOARD_NOTIFICATIONS_DATA: AdminNotification[] = [
  {
    type: 'new event',
    description: 'A new event has been created: Tech Conference 2024.',
    timestamp: new Date(),
    eventId: 1,
  },
  {
    type: 'user registration',
    description: 'A new user has registered: John Doe.',
    timestamp: new Date(),
    eventId: null,
  },
  {
    type: 'event update',
    description: 'Event details have been updated for: AI Workshop.',
    timestamp: new Date(),
    eventId: 2,
  },
  {
    type: 'user feedback',
    description: 'User feedback has been submitted for: React Summit.',
    timestamp: new Date(),
    eventId: 3,
  },
  {
    type: 'event registration',
    description: 'New user has registered for: Cloud Summit.',
    timestamp: new Date(),
    eventId: 4,
  },
];

export const ADMIN_DASHBOARD_FEEDBACK_DATA: EventFeedback = {
  metrics: {
    totalFeedbacks: 145,
    averageRating: 4.2,
    highestRating: 5,
  },
  events: [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-12-01',
      description:
        'Explore the latest trends in technology with industry leaders.',
    },
    {
      id: 2,
      name: 'AI Workshop',
      date: '2024-11-20',
      description:
        'An intensive workshop diving deep into artificial intelligence concepts and applications.',
    },
    {
      id: 3,
      name: 'Hackathon',
      date: '2024-10-15',
      description:
        'Collaborate, innovate, and code to solve real-world problems.',
    },
    {
      id: 4,
      name: 'Product Launch',
      date: '2024-12-10',
      description:
        'Witness the unveiling of the latest groundbreaking products.',
    },
    {
      id: 5,
      name: 'Startup Meetup',
      date: '2024-09-25',
      description: 'Network and exchange ideas with budding entrepreneurs.',
    },
    {
      id: 6,
      name: 'Data Science Bootcamp',
      date: '2024-11-01',
      description:
        'Master the art of data analysis and visualization in this hands-on bootcamp.',
    },
    {
      id: 7,
      name: 'Blockchain Summit',
      date: '2024-10-30',
      description:
        'Discover the potential of blockchain technology and its future applications.',
    },
    {
      id: 8,
      name: 'IoT Expo',
      date: '2024-11-15',
      description:
        'Explore the Internet of Things ecosystem and its groundbreaking innovations.',
    },
    {
      id: 9,
      name: 'Cloud Computing Forum',
      date: '2024-09-10',
      description:
        'Delve into the world of cloud computing and its transformative impact.',
    },
    {
      id: 10,
      name: 'Cybersecurity Webinar',
      date: '2024-12-05',
      description:
        'Stay ahead of cyber threats with insights from top security experts.',
    },
    {
      id: 11,
      name: 'Design Thinking Workshop',
      date: '2024-08-20',
      description:
        'Learn the principles of design thinking to innovate effectively.',
    },
    {
      id: 12,
      name: 'DevOps Conference',
      date: '2024-10-05',
      description:
        'Bridge the gap between development and operations for seamless integration.',
    },
    {
      id: 13,
      name: 'Gaming Hackathon',
      date: '2024-07-15',
      description:
        'A creative space for developers to design and build exciting games.',
    },
    {
      id: 14,
      name: 'Fintech Innovations',
      date: '2024-09-18',
      description:
        'Explore disruptive technologies shaping the future of financial services.',
    },
    {
      id: 15,
      name: 'HealthTech Symposium',
      date: '2024-11-10',
      description:
        'Discover technological advancements revolutionizing healthcare.',
    },
    {
      id: 16,
      name: 'Machine Learning Seminar',
      date: '2024-10-12',
      description:
        'Gain in-depth knowledge of machine learning algorithms and use cases.',
    },
    {
      id: 17,
      name: 'Big Data Analytics',
      date: '2024-09-08',
      description:
        'Harness the power of big data to drive informed decision-making.',
    },
    {
      id: 18,
      name: 'AR/VR Immersion',
      date: '2024-10-20',
      description:
        'Dive into the world of augmented and virtual reality experiences.',
    },
    {
      id: 19,
      name: 'Social Media Masterclass',
      date: '2024-08-12',
      description: 'Learn to craft impactful social media strategies.',
    },
    {
      id: 20,
      name: 'Quantum Computing Talk',
      date: '2024-07-10',
      description:
        'Understand the basics and breakthroughs in quantum computing.',
    },
  ],
  recentFeedbacks: [
    {
      user: 'John Doe',
      rating: 5,
      comment: 'Amazing experience! Highly recommend.',
    },
    {
      user: 'Jane Smith',
      rating: 4,
      comment: 'Very informative and well-organized.',
    },
    {
      user: null,
      rating: 3,
      comment: 'The content could have been more detailed.',
    },
    {
      user: 'Alice Brown',
      rating: 5,
      comment: 'Exceptional delivery by the speakers.',
    },
    {
      user: 'Bob Johnson',
      rating: 4,
      comment: 'Great insights, but the event ran a bit late.',
    },
    {
      user: 'Chris Evans',
      rating: 5,
      comment: 'Perfectly organized and highly engaging.',
    },
    {
      user: 'Emma Watson',
      rating: 4,
      comment: 'Well-structured and informative.',
    },
    {
      user: 'Harry Potter',
      rating: 3,
      comment: 'Room for improvement in the Q&A session.',
    },
    {
      user: 'Ron Weasley',
      rating: 4,
      comment: 'Good event overall. Learned a lot.',
    },
    {
      user: 'Bruce Wayne',
      rating: 5,
      comment: 'Highly engaging and well worth attending.',
    },
    {
      user: 'Diana Prince',
      rating: 4,
      comment: 'Good, but could have included more hands-on activities.',
    },
    {
      user: 'Tony Stark',
      rating: 5,
      comment: 'One of the best events I have attended!',
    },
    {
      user: 'Natasha Romanoff',
      rating: 4,
      comment: 'Very well-planned and insightful.',
    },
    {
      user: 'Steve Rogers',
      rating: 5,
      comment: 'Fantastic insights shared by the panel.',
    },
    {
      user: null,
      rating: 2,
      comment: 'The session was too basic for my level.',
    },
    {
      user: 'Clark Kent',
      rating: 5,
      comment: 'Great presentation style and content.',
    },
    {
      user: 'Hermione Granger',
      rating: 5,
      comment: 'Loved every bit of the event!',
    },
    {
      user: 'Anonymous',
      rating: 3,
      comment: 'The event was average, could use more examples.',
    },
    {
      user: 'Bruce Banner',
      rating: 4,
      comment: 'Informative but lacked depth in some areas.',
    },
    {
      user: 'Peter Parker',
      rating: 5,
      comment: 'Exceeded my expectations! Wonderful experience.',
    },
  ],
};

export const ADMIN_DASHBOARD_REPORTS_DATA: EventReports = {
  metrics: {
    totalEvents: 25,
    totalFeedback: 120,
    totalRegistrations: 1500,
  },
  events: [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-12-01',
      description:
        'Explore the latest trends in technology with industry leaders.',
    },
    {
      id: 2,
      name: 'AI Workshop',
      date: '2024-11-20',
      description:
        'An intensive workshop diving deep into artificial intelligence concepts and applications.',
    },
    {
      id: 3,
      name: 'Hackathon',
      date: '2024-10-15',
      description:
        'Collaborate, innovate, and code to solve real-world problems.',
    },
    {
      id: 4,
      name: 'Product Launch',
      date: '2024-12-10',
      description:
        'Witness the unveiling of the latest groundbreaking products.',
    },
    {
      id: 5,
      name: 'Startup Meetup',
      date: '2024-09-25',
      description: 'Network and exchange ideas with budding entrepreneurs.',
    },
    {
      id: 6,
      name: 'Data Science Bootcamp',
      date: '2024-11-01',
      description:
        'Master the art of data analysis and visualization in this hands-on bootcamp.',
    },
    {
      id: 7,
      name: 'Blockchain Summit',
      date: '2024-10-30',
      description:
        'Discover the potential of blockchain technology and its future applications.',
    },
    {
      id: 8,
      name: 'IoT Expo',
      date: '2024-11-15',
      description:
        'Explore the Internet of Things ecosystem and its groundbreaking innovations.',
    },
    {
      id: 9,
      name: 'Cloud Computing Forum',
      date: '2024-09-10',
      description:
        'Delve into the world of cloud computing and its transformative impact.',
    },
    {
      id: 10,
      name: 'Cybersecurity Webinar',
      date: '2024-12-05',
      description:
        'Stay ahead of cyber threats with insights from top security experts.',
    },
    {
      id: 11,
      name: 'Design Thinking Workshop',
      date: '2024-08-20',
      description:
        'Learn the principles of design thinking to innovate effectively.',
    },
    {
      id: 12,
      name: 'DevOps Conference',
      date: '2024-10-05',
      description:
        'Bridge the gap between development and operations for seamless integration.',
    },
    {
      id: 13,
      name: 'Gaming Hackathon',
      date: '2024-07-15',
      description:
        'A creative space for developers to design and build exciting games.',
    },
    {
      id: 14,
      name: 'Fintech Innovations',
      date: '2024-09-18',
      description:
        'Explore disruptive technologies shaping the future of financial services.',
    },
    {
      id: 15,
      name: 'HealthTech Symposium',
      date: '2024-11-10',
      description:
        'Discover technological advancements revolutionizing healthcare.',
    },
    {
      id: 16,
      name: 'Machine Learning Seminar',
      date: '2024-10-12',
      description:
        'Gain in-depth knowledge of machine learning algorithms and use cases.',
    },
    {
      id: 17,
      name: 'Big Data Analytics',
      date: '2024-09-08',
      description:
        'Harness the power of big data to drive informed decision-making.',
    },
    {
      id: 18,
      name: 'AR/VR Immersion',
      date: '2024-10-20',
      description:
        'Dive into the world of augmented and virtual reality experiences.',
    },
    {
      id: 19,
      name: 'Social Media Masterclass',
      date: '2024-08-12',
      description: 'Learn to craft impactful social media strategies.',
    },
    {
      id: 20,
      name: 'Quantum Computing Talk',
      date: '2024-07-10',
      description:
        'Understand the basics and breakthroughs in quantum computing.',
    },
  ],
};

export const USER_DASHBOARD_DATA: UserDashboardItems = {
  userDetails: {
    userImageUrl: 'https://via.placeholder.com/150',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
  },
  userEventSummary: {
    registeredEvents: 5,
    upcomingEvents: 2,
    eventsAttended: 3,
  },
  userNotifications: [
    'Upcoming Event: Tech Conference on Dec 15th',
    'Reminder: Event registration closes soon',
    'Your feedback for the last event has been recorded',
  ],
  userStats: {
    totalEventsRegistered: 10,
    feedbackGiven: 4,
  },
};
