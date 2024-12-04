import { EventAnalytics } from '../model/admin/Event_Analytics';
import { EventAttendance } from '../model/admin/Event_Attendance';
import { EventFeedback } from '../model/admin/Event_Feedback';
import { EventReports } from '../model/admin/Event_Reports';
import { AdminNotification } from '../model/admin/Notifications';
import { EventAnalytic } from '../model/event/EventAnalytic';
import { EventAttendanceData } from '../model/event/EventAttendance';
import { EventAttendee } from '../model/event/EventAttendee';
import { EventDetailPage } from '../model/event/EventDetail';
import { EventEdit } from '../model/event/EventEdit';
import { UserDashboardItems } from '../model/user/Items';
import { EventQRCode } from '../model/user/QRCode';
import { UserEvents } from '../model/user/registeredEvents';

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

export const USER_DASHBOARD_EVENTS: UserEvents = {
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

export const USER_DASHBOARD_EVENTS_QR: EventQRCode[] = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: '2024-12-03',
    time: '10:00 AM',
    location: 'Main Auditorium',
    status: 'Not Marked',
    attendanceCode: 'a8f9sdf7ds9f8gdf72gdf8fsd3afkl9',
  },
  {
    id: 2,
    name: 'Art Workshop',
    date: '2024-12-03',
    time: '2:00 PM',
    location: 'Art Room 1',
    status: 'Present',
    attendanceCode: 'f3a7d9g0e3k8b2g5d7a0c9fd4b7ea5',
  },
  {
    id: 3,
    name: 'Yoga Class',
    date: '2024-12-03',
    time: '6:00 PM',
    location: 'Gym Hall',
    status: 'Not Marked',
    attendanceCode: 'b7e5f2g0d8f3c7a6k9a4df0a2f3g8b',
  },
  {
    id: 4,
    name: 'Business Seminar',
    date: '2024-12-03',
    time: '9:00 AM',
    location: 'Conference Room B',
    status: 'Present',
    attendanceCode: 'e9f0b3a8c7d6k5g2a4f9b3d8g0a5cf',
  },
  {
    id: 5,
    name: 'Cooking Class',
    date: '2024-12-03',
    time: '11:30 AM',
    location: 'Kitchen Area',
    status: 'Not Marked',
    attendanceCode: 'c8d7f5g0e3a9k2b4f9a3d6g7a0b5fc',
  },
  {
    id: 7,
    name: 'Tech Meetup',
    date: '2024-12-03',
    time: '3:00 PM',
    location: 'Innovation Hub',
    status: 'Not Marked',
    attendanceCode: 'a9f8c3d7g0e5k6b2a4f9b3d8g7a0cf',
  },
  {
    id: 8,
    name: 'Dance Workshop',
    date: '2024-12-03',
    time: '4:30 PM',
    location: 'Dance Hall',
    status: 'Present',
    attendanceCode: 'k5f3a8d9b7g2e0c6a4f9b3d8g7a0cf',
  },
  {
    id: 9,
    name: 'Music Practice',
    date: '2024-12-03',
    time: '7:00 PM',
    location: 'Music Room 2',
    status: 'Not Marked',
    attendanceCode: 'g2d7a8f9k0c3b5e6a4f9b3d8g7a0cf',
  },
  {
    id: 10,
    name: 'Science Fair',
    date: '2024-12-03',
    time: '8:00 PM',
    location: 'Exhibition Hall',
    status: 'Present',
    attendanceCode: 'f8a9c3g7d5k6b2a4f9b3d8g7a0ec5f',
  },
];

export const USER_DASHBOARD_GIVE_FEEDBACK_EVENTS = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: '2024-12-03',
    time: '10:00 AM',
    location: 'Main Auditorium',
  },
  {
    id: 2,
    name: 'Art Workshop',
    date: '2024-12-03',
    time: '2:00 PM',
    location: 'Art Room 1',
  },
  {
    id: 3,
    name: 'Yoga Class',
    date: '2024-12-03',
    time: '6:00 PM',
    location: 'Gym Hall',
  },
  {
    id: 4,
    name: 'Music Festival',
    date: '2024-12-04',
    time: '9:00 AM',
    location: 'Open Arena',
  },
  {
    id: 5,
    name: 'Photography Seminar',
    date: '2024-12-05',
    time: '1:00 PM',
    location: 'Conference Room A',
  },
  {
    id: 6,
    name: 'Cooking Class',
    date: '2024-12-06',
    time: '3:00 PM',
    location: 'Kitchen Lab',
  },
  {
    id: 7,
    name: 'Business Strategy Workshop',
    date: '2024-12-07',
    time: '4:00 PM',
    location: 'Meeting Room 1',
  },
  {
    id: 8,
    name: 'Digital Marketing Seminar',
    date: '2024-12-08',
    time: '5:00 PM',
    location: 'Seminar Hall',
  },
  {
    id: 9,
    name: 'Graphic Design Course',
    date: '2024-12-09',
    time: '11:00 AM',
    location: 'Art Room 2',
  },
  {
    id: 10,
    name: 'Creative Writing Workshop',
    date: '2024-12-10',
    time: '7:00 PM',
    location: 'Library Hall',
  },
  {
    id: 11,
    name: 'AI for Beginners',
    date: '2024-12-11',
    time: '9:30 AM',
    location: 'Tech Hub',
  },
  {
    id: 12,
    name: 'Web Development Bootcamp',
    date: '2024-12-12',
    time: '10:00 AM',
    location: 'Room 302',
  },
  {
    id: 13,
    name: 'Blockchain Workshop',
    date: '2024-12-13',
    time: '12:00 PM',
    location: 'Room 401',
  },
  {
    id: 14,
    name: 'Data Science Bootcamp',
    date: '2024-12-14',
    time: '1:00 PM',
    location: 'Tech Lab',
  },
  {
    id: 15,
    name: 'Entrepreneurship Seminar',
    date: '2024-12-15',
    time: '3:30 PM',
    location: 'Conference Hall',
  },
  {
    id: 16,
    name: 'Graphic Arts Expo',
    date: '2024-12-16',
    time: '4:30 PM',
    location: 'Expo Center',
  },
  {
    id: 17,
    name: 'Cybersecurity Basics',
    date: '2024-12-17',
    time: '2:00 PM',
    location: 'Security Lab',
  },
  {
    id: 18,
    name: 'Digital Illustration Workshop',
    date: '2024-12-18',
    time: '10:00 AM',
    location: 'Creative Studio',
  },
  {
    id: 19,
    name: 'Startup Ideas Pitching',
    date: '2024-12-19',
    time: '11:30 AM',
    location: 'Innovation Center',
  },
  {
    id: 20,
    name: 'App Development Bootcamp',
    date: '2024-12-20',
    time: '12:30 PM',
    location: 'Room 503',
  },
];

export const USER_DASHBOARD_VIEW_FEEDBACK_EVENTS = [
  {
    eventName: 'Tech Conference 2024',
    description: 'A deep dive into the latest tech trends.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-06-15',
    location: 'Convention Center, NYC',
    rating: 4.5,
    speakerRating: 4,
    venueRating: 5,
    comments: 'The event was fantastic, but the sessions could be longer.',
    suggestions: 'More interactive sessions with Q&A.',
  },
  {
    eventName: 'Health Symposium',
    description: 'An informative event on the latest in health sciences.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-07-20',
    location: 'City Hall, London',
    rating: 3.8,
    speakerRating: 4,
    venueRating: 3,
    comments: 'The speakers were good, but the venue was a bit uncomfortable.',
    suggestions: 'Choose a bigger venue with better seating arrangements.',
  },
  {
    eventName: 'Art Workshop',
    description: 'Explore your creativity with hands-on art sessions.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-08-05',
    location: 'Art Studio, Paris',
    rating: 4.2,
    speakerRating: 5,
    venueRating: 4,
    comments: 'Loved the interactive nature of the workshop.',
    suggestions: 'Provide more art supplies for participants.',
  },
  {
    eventName: 'Business Strategy Workshop',
    description: 'Learn effective strategies for business growth.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-09-10',
    location: 'Conference Hall, Chicago',
    rating: 4.7,
    speakerRating: 5,
    venueRating: 4.5,
    comments: 'Great insights from the speakers!',
    suggestions: 'Include more case studies in the sessions.',
  },
  {
    eventName: 'Music Festival',
    description: 'A celebration of music and culture.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-09-25',
    location: 'Open Arena, Berlin',
    rating: 4.9,
    speakerRating: 5,
    venueRating: 5,
    comments: 'Amazing performances and a fantastic atmosphere!',
    suggestions: 'Extend the duration of the festival.',
  },
  {
    eventName: 'Photography Seminar',
    description: 'Master the art of photography with expert tips.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-10-05',
    location: 'Studio X, Sydney',
    rating: 4.0,
    speakerRating: 4.5,
    venueRating: 3.8,
    comments: 'Informative sessions, but the lighting was not ideal.',
    suggestions: 'Ensure better lighting arrangements in future events.',
  },
  {
    eventName: 'Yoga Class',
    description: 'Relax and rejuvenate with yoga.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-10-15',
    location: 'Wellness Center, Tokyo',
    rating: 4.3,
    speakerRating: 4,
    venueRating: 4.5,
    comments: 'Very calming and refreshing experience.',
    suggestions: 'Provide yoga mats for participants.',
  },
  {
    eventName: 'Digital Marketing Seminar',
    description: 'Learn the latest trends in digital marketing.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-11-10',
    location: 'Tech Hub, San Francisco',
    rating: 4.6,
    speakerRating: 5,
    venueRating: 4,
    comments: 'The content was very relevant and well-presented.',
    suggestions: 'Include practical workshops along with the seminar.',
  },
  {
    eventName: 'Cooking Class',
    description: 'Enhance your culinary skills with expert chefs.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-11-25',
    location: 'Gourmet Kitchen, Milan',
    rating: 4.8,
    speakerRating: 5,
    venueRating: 4.7,
    comments: 'Absolutely loved the hands-on cooking experience!',
    suggestions: 'Provide recipe booklets to participants.',
  },
  {
    eventName: 'AI for Beginners',
    description: 'An introductory course on Artificial Intelligence.',
    image: 'https://via.placeholder.com/400x200',
    date: '2024-12-01',
    location: 'Innovation Lab, Boston',
    rating: 4.4,
    speakerRating: 4.5,
    venueRating: 4,
    comments: 'Great introduction to AI concepts.',
    suggestions: 'Provide more real-world examples during the sessions.',
  },
];

export const EVENT_ANALYTIC_DATA: EventAnalytic = {
  id: '1',
  name: 'Tech Conference 2024',
  totalRegistrations: 120,
  actualAttendance: 95,
  feedbackRating: 4.3,
  totalFeedbackCount: 60,
  feedbackCounts: {
    '1 star': 10,
    '2 star': 20,
    '3 star': 30,
    '4 star': 20,
    '5 star': 10,
  },
  topFeedbacks: [
    'The speakers were amazing!',
    'Great organization and timing.',
    'Loved the interactive Q&A sessions.',
  ],
};

export const EVENT_ATTENDANCE_DATA: EventAttendanceData = {
  metrics: {
    capacity: 200,
    filled: 180,
    present: 120,
    yetToCome: 60,
    absent: 20,
  },
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      registeredDate: '2024-12-01',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'A1234-XYZ6789-PQR9876-ABCD1234',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      registeredDate: '2024-12-02',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'B2345-XYZ7890-DEF5678-XYZ9876',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      registeredDate: '2024-12-03',
      currentStatus: 'Absent',
      attending: 'Absent',
      attendanceCode: 'C3456-ABC1234-LMN4567-QWERTY7890',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      registeredDate: '2024-12-04',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'D4567-DEF3456-MNB6789-ASDF0987',
    },
    {
      id: 5,
      name: 'Mike Davis',
      email: 'mike@example.com',
      registeredDate: '2024-12-05',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'E5678-XYZ4567-OPQ1234-RTY7890',
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      registeredDate: '2024-12-06',
      currentStatus: 'Absent',
      attending: 'Absent',
      attendanceCode: 'F6789-MNB1234-WER0987-QWER5678',
    },
    {
      id: 7,
      name: 'Chris Taylor',
      email: 'chris@example.com',
      registeredDate: '2024-12-07',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'G7890-RTY2345-HGJ4567-LOP8901',
    },
    {
      id: 8,
      name: 'Emma Miller',
      email: 'emma@example.com',
      registeredDate: '2024-12-08',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'H8901-PLM6789-KJI2345-WAS7890',
    },
    {
      id: 9,
      name: 'David Clark',
      email: 'david@example.com',
      registeredDate: '2024-12-09',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'I9012-POI5678-MNB3456-VCX6789',
    },
    {
      id: 10,
      name: 'Olivia Harris',
      email: 'olivia@example.com',
      registeredDate: '2024-12-10',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'J0123-DFG8901-QAZ5678-PLK1234',
    },
    {
      id: 11,
      name: 'Liam Martin',
      email: 'liam@example.com',
      registeredDate: '2024-12-11',
      currentStatus: 'Absent',
      attending: 'Yet to Come',
      attendanceCode: 'K1234-DSF2345-KLM7890-QWE1234',
    },
    {
      id: 12,
      name: 'Sophia Lee',
      email: 'sophia@example.com',
      registeredDate: '2024-12-12',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'L2345-MNB3456-WQX5678-RTY2345',
    },
    {
      id: 13,
      name: 'Mason White',
      email: 'mason@example.com',
      registeredDate: '2024-12-13',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'M3456-RTY4567-VBN2345-TYU5678',
    },
    {
      id: 14,
      name: 'Isabella Walker',
      email: 'isabella@example.com',
      registeredDate: '2024-12-14',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'N4567-IKJ2345-YUI4567-WRE7890',
    },
    {
      id: 15,
      name: 'Ethan Hall',
      email: 'ethan@example.com',
      registeredDate: '2024-12-15',
      currentStatus: 'Absent',
      attending: 'Absent',
      attendanceCode: 'O5678-ASD5678-PLK1234-NOP8901',
    },
    {
      id: 16,
      name: 'Ava Young',
      email: 'ava@example.com',
      registeredDate: '2024-12-16',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'P6789-DFG2345-HJK6789-RTY9012',
    },
    {
      id: 17,
      name: 'Lucas King',
      email: 'lucas@example.com',
      registeredDate: '2024-12-17',
      currentStatus: 'Registered',
      attending: 'Present',
      attendanceCode: 'Q7890-ASD3456-KJH2345-VBN8901',
    },
    {
      id: 18,
      name: 'Mia Wright',
      email: 'mia@example.com',
      registeredDate: '2024-12-18',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'R8901-QWE4567-PLK2345-DFG1234',
    },
    {
      id: 19,
      name: 'Noah Green',
      email: 'noah@example.com',
      registeredDate: '2024-12-19',
      currentStatus: 'Absent',
      attending: 'Absent',
      attendanceCode: 'S9012-MNB2345-RTY1234-QWE5678',
    },
    {
      id: 20,
      name: 'Charlotte Adams',
      email: 'charlotte@example.com',
      registeredDate: '2024-12-20',
      currentStatus: 'Registered',
      attending: 'Yet to Come',
      attendanceCode: 'a8f9sdf7ds9f8gdf72gdf8fsd3afkl9',
    },
  ],

  eventDetails: {
    name: 'Tech Conference 2024',
    description: 'A conference exploring the latest in technology.',
    location: 'Grand Tech Hall, NYC',
    date: new Date('2024-12-04'),
  },
};

export const EVENT_ATTENDEE_DATA: EventAttendee = {
  eventDetails: {
    eventId: 1,
    eventName: 'Tech Conference 2024',
    eventDetails:
      'A great event for tech enthusiasts and professionals. The event will feature workshops, keynotes, and networking opportunities with industry leaders.',
    eventPrivacySetting: 'Only to Registered Users',
  },
  userDetail: {
    userHasRegistered: false,
    isAdmin: true,
  },
  attendees: [
    {
      name: 'John Doe',
      email: 'john@example.com',
      registrationDate: '2024-12-01',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      registrationDate: '2024-12-02',
    },
    {
      name: 'Alice Brown',
      email: 'alice@example.com',
      registrationDate: '2024-12-03',
    },
    {
      name: 'Mike Davis',
      email: 'mike@example.com',
      registrationDate: '2024-12-04',
    },
    {
      name: 'Sophia Lee',
      email: 'sophia@example.com',
      registrationDate: '2024-12-05',
    },
    {
      name: 'David Clark',
      email: 'david@example.com',
      registrationDate: '2024-12-06',
    },
    {
      name: 'Emma Miller',
      email: 'emma@example.com',
      registrationDate: '2024-12-07',
    },
    {
      name: 'Olivia Harris',
      email: 'olivia@example.com',
      registrationDate: '2024-12-08',
    },
    {
      name: 'Lucas King',
      email: 'lucas@example.com',
      registrationDate: '2024-12-09',
    },
    {
      name: 'Chris Taylor',
      email: 'chris@example.com',
      registrationDate: '2024-12-10',
    },
    {
      name: 'Isabella Walker',
      email: 'isabella@example.com',
      registrationDate: '2024-12-11',
    },
    {
      name: 'Mason White',
      email: 'mason@example.com',
      registrationDate: '2024-12-12',
    },
    {
      name: 'Ethan Hall',
      email: 'ethan@example.com',
      registrationDate: '2024-12-13',
    },
    {
      name: 'Charlotte Adams',
      email: 'charlotte@example.com',
      registrationDate: '2024-12-14',
    },
  ],
};

export const EVENT_DETAIL_PAGE_DATA: EventDetailPage = {
  eventDetails: {
    id: 1,
    title: 'Tech Conference 2024',
    date: '2024-12-12',
    location: 'Grand Convention Center, New York',
    description:
      'Join us for an exciting conference about the latest in tech innovations.',
    agenda: [
      '10:00 AM - Opening Remarks',
      '11:00 AM - Keynote by John Doe',
      '01:00 PM - Networking Lunch',
      '02:00 PM - Breakout Sessions',
    ],
    speakers: [
      { name: 'John Doe', bio: 'Tech Expert' },
      { name: 'Jane Smith', bio: 'AI Specialist' },
    ],
    media: [
      { type: 'image', src: 'https://via.placeholder.com/800x400' },
      { type: 'video', src: 'https://www.w3schools.com/html/movie.mp4' },
    ],
    registrationLimit: 200,
    filledSeats: 150,
  },
  isUserRegisteredForEvent: true,
};

export const EVENT_EDIT_DATA: EventEdit = {
  eventId: 'adjbfnsdf',
  eventTitle: 'Sample Tech Conference 2024',
  eventDescription:
    'Join us for an exciting conference about the latest in tech innovations.',
  eventDate: '2024-12-15',
  eventTime: '09:00',
  eventLocation: 'Tech Convention Center, Silicon Valley',
  eventCategory: 'Conference',
  registrationLimit: 500,
  eventTags: 'Technology, Conference, Innovation, Networking',
  coverImage: 'https://via.placeholder.com/800x400',
  agenda: [
    { agendaItem: 'Opening Remarks', startTime: '09:00' },
    { agendaItem: 'Keynote by John Doe', startTime: '09:30' },
    { agendaItem: 'Panel Discussion: Future of AI', startTime: '11:00' },
    { agendaItem: 'Lunch Break', startTime: '12:30' },
    { agendaItem: 'Networking Session', startTime: '14:00' },
    { agendaItem: 'Closing Remarks', startTime: '16:00' },
  ],
  speakers: [
    { name: 'John Doe', bio: 'CEO of Example Corp and Tech Innovator' },
    { name: 'Jane Smith', bio: 'AI Specialist and Researcher' },
    { name: 'Alex Brown', bio: 'Tech Entrepreneur and Investor' },
  ],
  attendeeList: 'public',
};
