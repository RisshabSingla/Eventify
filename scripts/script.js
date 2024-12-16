const axios = require("axios");

const baseUrl = "http://localhost:8080";

const events = [
  {
    eventTitle: "Tech Innovations Summit",
    eventDescription:
      "Exploring the latest trends and innovations in technology.",
    eventDate: "2024-12-12",
    eventTime: "09:00",
    eventLocation: "Convention Center, City A",
    eventCategory: "Conference",
    registrationLimit: 200,
    eventTags: "Technology, Innovation",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Keynote Speech" },
      { time: "11:00", description: "Panel Discussion" },
    ],
    speakers: [
      { name: "Dr. Emily Tech", bio: "Tech Visionary" },
      { name: "Mr. John Developer", bio: "Software Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "AI and Future Tech Forum",
    eventDescription:
      "A deep dive into AI's role in shaping the future of technology.",
    eventDate: "2024-12-13",
    eventTime: "10:00",
    eventLocation: "Tech Hub, City B",
    eventCategory: "Conference",
    registrationLimit: 150,
    eventTags: "AI, Future Tech",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Opening Remarks" },
      { time: "12:00", description: "AI in Healthcare Panel" },
    ],
    speakers: [
      { name: "Dr. Sarah AI", bio: "AI Researcher" },
      { name: "Mr. Alan Tech", bio: "AI Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Blockchain Technology Expo",
    eventDescription:
      "Understanding blockchain's impact on various industries.",
    eventDate: "2024-12-14",
    eventTime: "14:00",
    eventLocation: "Blockchain Arena, City C",
    eventCategory: "Expo",
    registrationLimit: 100,
    eventTags: "Blockchain, Technology",
    coverImage: "",
    agenda: [
      { time: "14:00", description: "Blockchain 101" },
      { time: "16:00", description: "Blockchain in Finance" },
    ],
    speakers: [
      { name: "Ms. Clara Chain", bio: "Blockchain Expert" },
      { name: "Mr. Robert Block", bio: "Blockchain Developer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Cybersecurity Trends and Challenges",
    eventDescription:
      "Discussing the latest trends and challenges in cybersecurity.",
    eventDate: "2024-12-15",
    eventTime: "15:00",
    eventLocation: "Security Hall, City D",
    eventCategory: "Seminar",
    registrationLimit: 120,
    eventTags: "Cybersecurity, Tech Trends",
    coverImage: "",
    agenda: [
      { time: "15:00", description: "Introduction to Cybersecurity" },
      { time: "17:00", description: "Emerging Cybersecurity Threats" },
    ],
    speakers: [
      { name: "Mr. Jack Secure", bio: "Cybersecurity Specialist" },
      { name: "Dr. Tina Defense", bio: "Cybersecurity Researcher" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Web Development Bootcamp",
    eventDescription:
      "A comprehensive workshop on modern web development techniques.",
    eventDate: "2024-12-16",
    eventTime: "09:00",
    eventLocation: "Tech Academy, City E",
    eventCategory: "Workshop",
    registrationLimit: 50,
    eventTags: "Web Development, Workshop",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Introduction to HTML and CSS" },
      { time: "12:00", description: "Building Responsive Websites" },
    ],
    speakers: [
      { name: "Ms. Laura Code", bio: "Frontend Developer" },
      { name: "Mr. Tom Design", bio: "UI/UX Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Startup Pitch Fest",
    eventDescription:
      "An opportunity for startups to pitch their ideas to investors.",
    eventDate: "2024-12-16",
    eventTime: "10:00",
    eventLocation: "Innovation Hall, City F",
    eventCategory: "Competition",
    registrationLimit: 75,
    eventTags: "Startup, Investment",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Welcome and Introductions" },
      { time: "11:00", description: "Startup Pitches" },
    ],
    speakers: [
      { name: "Mr. Vin Investor", bio: "Venture Capitalist" },
      { name: "Ms. Nancy Entrepreneur", bio: "Startup Founder" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Green Energy Workshop",
    eventDescription: "Exploring sustainable energy solutions for the future.",
    eventDate: "2024-12-17",
    eventTime: "13:00",
    eventLocation: "Eco Center, City G",
    eventCategory: "Workshop",
    registrationLimit: 80,
    eventTags: "Green Energy, Sustainability",
    coverImage: "",
    agenda: [
      { time: "13:00", description: "Introduction to Renewable Energy" },
      { time: "15:00", description: "Solar and Wind Power Innovations" },
    ],
    speakers: [
      { name: "Dr. Lisa Green", bio: "Environmental Scientist" },
      { name: "Mr. Paul Power", bio: "Energy Consultant" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Data Science Symposium",
    eventDescription: "Exploring the world of data and its applications.",
    eventDate: "2024-12-18",
    eventTime: "09:30",
    eventLocation: "Data Hub, City H",
    eventCategory: "Conference",
    registrationLimit: 150,
    eventTags: "Data Science, AI",
    coverImage: "",
    agenda: [
      { time: "09:30", description: "Keynote: The Future of Data Science" },
      { time: "11:30", description: "Machine Learning Applications" },
    ],
    speakers: [
      { name: "Ms. Anna Analyze", bio: "Data Scientist" },
      { name: "Mr. Sam Predict", bio: "AI Researcher" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "HealthTech Innovations",
    eventDescription:
      "Innovations and technology solutions shaping healthcare.",
    eventDate: "2024-12-19",
    eventTime: "10:00",
    eventLocation: "Health Hall, City I",
    eventCategory: "Conference",
    registrationLimit: 100,
    eventTags: "HealthTech, Innovation",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "AI in Diagnostics" },
      { time: "12:00", description: "Wearable Tech in Healthcare" },
    ],
    speakers: [
      { name: "Dr. Alex Health", bio: "Healthcare Innovator" },
      { name: "Ms. Zoe Care", bio: "Tech Consultant" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Smart City Innovations",
    eventDescription: "Advancing urban living with smart technologies.",
    eventDate: "2024-12-20",
    eventTime: "11:00",
    eventLocation: "City Center, City J",
    eventCategory: "Expo",
    registrationLimit: 150,
    eventTags: "Smart City, Technology",
    coverImage: "",
    agenda: [
      { time: "11:00", description: "Smart Transportation Systems" },
      { time: "13:00", description: "IoT in Urban Development" },
    ],
    speakers: [
      { name: "Mr. Sam City", bio: "Urban Planner" },
      { name: "Dr. Kim Smart", bio: "IoT Specialist" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Tech Innovations Summit",
    eventDescription:
      "Exploring the latest trends and innovations in technology.",
    eventDate: "2024-12-12",
    eventTime: "09:00",
    eventLocation: "Convention Center, City A",
    eventCategory: "Conference",
    registrationLimit: 200,
    eventTags: "Technology, Innovation",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Keynote Speech" },
      { time: "11:00", description: "Panel Discussion" },
    ],
    speakers: [
      { name: "Dr. Emily Tech", bio: "Tech Visionary" },
      { name: "Mr. John Developer", bio: "Software Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "AI and Future Tech Forum",
    eventDescription:
      "A deep dive into AI's role in shaping the future of technology.",
    eventDate: "2024-12-13",
    eventTime: "10:00",
    eventLocation: "Tech Hub, City B",
    eventCategory: "Conference",
    registrationLimit: 150,
    eventTags: "AI, Future Tech",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Opening Remarks" },
      { time: "12:00", description: "AI in Healthcare Panel" },
    ],
    speakers: [
      { name: "Dr. Sarah AI", bio: "AI Researcher" },
      { name: "Mr. Alan Tech", bio: "AI Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Blockchain Technology Expo",
    eventDescription:
      "Understanding blockchain's impact on various industries.",
    eventDate: "2024-12-14",
    eventTime: "14:00",
    eventLocation: "Blockchain Arena, City C",
    eventCategory: "Expo",
    registrationLimit: 100,
    eventTags: "Blockchain, Technology",
    coverImage: "",
    agenda: [
      { time: "14:00", description: "Blockchain 101" },
      { time: "16:00", description: "Blockchain in Finance" },
    ],
    speakers: [
      { name: "Ms. Clara Chain", bio: "Blockchain Expert" },
      { name: "Mr. Robert Block", bio: "Blockchain Developer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Cybersecurity Trends and Challenges",
    eventDescription:
      "Discussing the latest trends and challenges in cybersecurity.",
    eventDate: "2024-12-15",
    eventTime: "15:00",
    eventLocation: "Security Hall, City D",
    eventCategory: "Seminar",
    registrationLimit: 120,
    eventTags: "Cybersecurity, Tech Trends",
    coverImage: "",
    agenda: [
      { time: "15:00", description: "Introduction to Cybersecurity" },
      { time: "17:00", description: "Emerging Cybersecurity Threats" },
    ],
    speakers: [
      { name: "Mr. Jack Secure", bio: "Cybersecurity Specialist" },
      { name: "Dr. Tina Defense", bio: "Cybersecurity Researcher" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Web Development Bootcamp",
    eventDescription:
      "A comprehensive workshop on modern web development techniques.",
    eventDate: "2024-12-16",
    eventTime: "09:00",
    eventLocation: "Tech Academy, City E",
    eventCategory: "Workshop",
    registrationLimit: 50,
    eventTags: "Web Development, Workshop",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Introduction to HTML and CSS" },
      { time: "12:00", description: "Building Responsive Websites" },
    ],
    speakers: [
      { name: "Ms. Laura Code", bio: "Frontend Developer" },
      { name: "Mr. Tom Design", bio: "UI/UX Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Startup Pitch Fest",
    eventDescription:
      "An opportunity for startups to pitch their ideas to investors.",
    eventDate: "2024-12-16",
    eventTime: "10:00",
    eventLocation: "Innovation Hall, City F",
    eventCategory: "Competition",
    registrationLimit: 75,
    eventTags: "Startup, Investment",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Welcome and Introductions" },
      { time: "11:00", description: "Startup Pitches" },
    ],
    speakers: [
      { name: "Mr. Vin Investor", bio: "Venture Capitalist" },
      { name: "Ms. Nancy Entrepreneur", bio: "Startup Founder" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Green Energy Workshop",
    eventDescription: "Exploring sustainable energy solutions for the future.",
    eventDate: "2024-12-17",
    eventTime: "13:00",
    eventLocation: "Eco Center, City G",
    eventCategory: "Workshop",
    registrationLimit: 80,
    eventTags: "Green Energy, Sustainability",
    coverImage: "",
    agenda: [
      { time: "13:00", description: "Introduction to Renewable Energy" },
      { time: "15:00", description: "Solar and Wind Power Innovations" },
    ],
    speakers: [
      { name: "Dr. Lisa Green", bio: "Environmental Scientist" },
      { name: "Mr. Paul Power", bio: "Energy Consultant" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Data Science Symposium",
    eventDescription: "Exploring the world of data and its applications.",
    eventDate: "2024-12-18",
    eventTime: "09:30",
    eventLocation: "Data Hub, City H",
    eventCategory: "Conference",
    registrationLimit: 150,
    eventTags: "Data Science, AI",
    coverImage: "",
    agenda: [
      { time: "09:30", description: "Keynote: The Future of Data Science" },
      { time: "11:30", description: "Machine Learning Applications" },
    ],
    speakers: [
      { name: "Ms. Anna Analyze", bio: "Data Scientist" },
      { name: "Mr. Sam Predict", bio: "AI Researcher" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "HealthTech Innovations",
    eventDescription:
      "Innovations and technology solutions shaping healthcare.",
    eventDate: "2024-12-19",
    eventTime: "10:00",
    eventLocation: "Health Hall, City I",
    eventCategory: "Conference",
    registrationLimit: 100,
    eventTags: "HealthTech, Innovation",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "AI in Diagnostics" },
      { time: "12:00", description: "Wearable Tech in Healthcare" },
    ],
    speakers: [
      { name: "Dr. Alex Health", bio: "Healthcare Innovator" },
      { name: "Ms. Zoe Care", bio: "Tech Consultant" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Smart City Innovations",
    eventDescription: "Advancing urban living with smart technologies.",
    eventDate: "2024-12-20",
    eventTime: "11:00",
    eventLocation: "City Center, City J",
    eventCategory: "Expo",
    registrationLimit: 150,
    eventTags: "Smart City, Technology",
    coverImage: "",
    agenda: [
      { time: "11:00", description: "Smart Transportation Systems" },
      { time: "13:00", description: "IoT in Urban Development" },
    ],
    speakers: [
      { name: "Mr. Sam City", bio: "Urban Planner" },
      { name: "Dr. Kim Smart", bio: "IoT Specialist" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Quantum Computing 101",
    eventDescription:
      "An introductory session on quantum computing and its future potential.",
    eventDate: "2024-12-13",
    eventTime: "14:00",
    eventLocation: "Tech Labs, City K",
    eventCategory: "Workshop",
    registrationLimit: 80,
    eventTags: "Quantum Computing, Technology",
    coverImage: "",
    agenda: [
      { time: "14:00", description: "Basics of Quantum Computing" },
      { time: "16:00", description: "Applications in Real World" },
    ],
    speakers: [
      { name: "Dr. Max Quantum", bio: "Quantum Physicist" },
      { name: "Ms. Ellie Entangle", bio: "Quantum Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Future of Space Exploration",
    eventDescription: "Discussing humanity's next steps in space exploration.",
    eventDate: "2024-12-14",
    eventTime: "09:00",
    eventLocation: "Space Arena, City L",
    eventCategory: "Seminar",
    registrationLimit: 120,
    eventTags: "Space, Exploration",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Space Missions Overview" },
      { time: "11:00", description: "Technologies Enabling Space Travel" },
    ],
    speakers: [
      { name: "Dr. Orion Star", bio: "Astrophysicist" },
      { name: "Mr. Nova Reach", bio: "Space Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Gaming Industry Insights",
    eventDescription:
      "An analysis of trends and innovations in the gaming industry.",
    eventDate: "2024-12-14",
    eventTime: "12:00",
    eventLocation: "Gaming Arena, City M",
    eventCategory: "Conference",
    registrationLimit: 150,
    eventTags: "Gaming, Technology",
    coverImage: "",
    agenda: [
      { time: "12:00", description: "Emerging Gaming Trends" },
      { time: "14:00", description: "Building Immersive Experiences" },
    ],
    speakers: [
      { name: "Ms. Rachel Play", bio: "Game Developer" },
      { name: "Mr. Henry Console", bio: "Game Designer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Robotics and Automation Summit",
    eventDescription:
      "Exploring robotics and automation's role in modern industries.",
    eventDate: "2024-12-15",
    eventTime: "10:00",
    eventLocation: "Robotics Center, City N",
    eventCategory: "Expo",
    registrationLimit: 200,
    eventTags: "Robotics, Automation",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Introduction to Robotics" },
      { time: "12:00", description: "Automation in Manufacturing" },
    ],
    speakers: [
      { name: "Dr. Alice Bot", bio: "Robotics Engineer" },
      { name: "Mr. Tim Auto", bio: "Automation Specialist" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "EdTech Revolution",
    eventDescription:
      "Innovative technologies transforming the education sector.",
    eventDate: "2024-12-16",
    eventTime: "11:00",
    eventLocation: "Learning Hub, City O",
    eventCategory: "Conference",
    registrationLimit: 100,
    eventTags: "EdTech, Innovation",
    coverImage: "",
    agenda: [
      { time: "11:00", description: "Future of Online Education" },
      { time: "13:00", description: "AI in Personalized Learning" },
    ],
    speakers: [
      { name: "Ms. Clara Learn", bio: "EdTech Consultant" },
      { name: "Mr. Brian Teach", bio: "Education Innovator" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "5G Technology Forum",
    eventDescription:
      "Understanding the impact and opportunities of 5G networks.",
    eventDate: "2024-12-17",
    eventTime: "14:00",
    eventLocation: "Network Hall, City P",
    eventCategory: "Conference",
    registrationLimit: 100,
    eventTags: "5G, Networking",
    coverImage: "",
    agenda: [
      { time: "14:00", description: "5G Network Basics" },
      { time: "16:00", description: "5G in Smart Cities" },
    ],
    speakers: [
      { name: "Mr. Sam Connect", bio: "Telecom Engineer" },
      { name: "Dr. Lara Speed", bio: "Network Specialist" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Entrepreneurship Meetup",
    eventDescription:
      "Networking and learning opportunities for budding entrepreneurs.",
    eventDate: "2024-12-18",
    eventTime: "10:00",
    eventLocation: "Innovation Hub, City Q",
    eventCategory: "Meetup",
    registrationLimit: 50,
    eventTags: "Entrepreneurship, Networking",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Meet and Greet" },
      {
        time: "11:30",
        description: "Panel Discussion: Challenges in Startups",
      },
    ],
    speakers: [
      { name: "Ms. Sophia Vision", bio: "Startup Mentor" },
      { name: "Mr. Dave Risk", bio: "Entrepreneur" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Digital Marketing Workshop",
    eventDescription:
      "Strategies for effective digital marketing in the modern era.",
    eventDate: "2024-12-18",
    eventTime: "09:00",
    eventLocation: "Marketing Hall, City R",
    eventCategory: "Workshop",
    registrationLimit: 80,
    eventTags: "Digital Marketing, Workshop",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "SEO Basics" },
      { time: "12:00", description: "Social Media Campaigns" },
    ],
    speakers: [
      { name: "Ms. Amanda Social", bio: "Marketing Consultant" },
      { name: "Mr. Tim Ads", bio: "Digital Marketer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Ethical Hacking Bootcamp",
    eventDescription:
      "A practical session on ethical hacking and cybersecurity.",
    eventDate: "2024-12-19",
    eventTime: "13:00",
    eventLocation: "Security Lab, City S",
    eventCategory: "Workshop",
    registrationLimit: 50,
    eventTags: "Ethical Hacking, Cybersecurity",
    coverImage: "",
    agenda: [
      { time: "13:00", description: "Introduction to Ethical Hacking" },
      { time: "15:00", description: "Hands-On Penetration Testing" },
    ],
    speakers: [
      { name: "Mr. Jack Hack", bio: "Ethical Hacker" },
      { name: "Dr. Karen Shield", bio: "Cybersecurity Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Fitness and Wellness Expo",
    eventDescription: "Promoting health and wellness with fitness solutions.",
    eventDate: "2024-12-20",
    eventTime: "08:00",
    eventLocation: "Wellness Center, City T",
    eventCategory: "Expo",
    registrationLimit: 150,
    eventTags: "Fitness, Wellness",
    coverImage: "",
    agenda: [
      { time: "08:00", description: "Morning Yoga Session" },
      { time: "10:00", description: "Nutrition and Wellness Talks" },
    ],
    speakers: [
      { name: "Ms. Tara Flex", bio: "Fitness Trainer" },
      { name: "Dr. Sarah Healthy", bio: "Nutritionist" },
    ],
    attendeeList: "Public",
  },

  {
    eventTitle: "Creative Writing Workshop",
    eventDescription: "Unleashing creativity through the art of writing.",
    eventDate: "2024-12-21",
    eventTime: "10:00",
    eventLocation: "Writers' Hub, City U",
    eventCategory: "Workshop",
    registrationLimit: 40,
    eventTags: "Writing, Creativity",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "Developing Story Ideas" },
      { time: "12:00", description: "Polishing Your Writing" },
    ],
    speakers: [
      { name: "Ms. Ella Words", bio: "Author" },
      { name: "Mr. Mark Write", bio: "Creative Writing Coach" },
    ],
    attendeeList: "Public",
  },

  {
    eventTitle: "AI and the Future of Healthcare",
    eventDescription:
      "A deep dive into the role of AI in transforming healthcare practices.",
    eventDate: "2024-12-09",
    eventTime: "10:00",
    eventLocation: "HealthTech Conference Hall, City B",
    eventCategory: "Conference",
    registrationLimit: 150,
    eventTags: "AI, Healthcare, Technology",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "AI in Medical Diagnosis" },
      { time: "12:00", description: "Robotics in Surgery" },
    ],
    speakers: [
      { name: "Dr. Alice MedTech", bio: "AI Researcher in Healthcare" },
      { name: "Mr. Henry Health", bio: "Surgeon and Robotics Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Future of Renewable Energy",
    eventDescription:
      "Exploring the advancements and future prospects of renewable energy.",
    eventDate: "2024-12-11",
    eventTime: "14:00",
    eventLocation: "Green Energy Forum, City C",
    eventCategory: "Seminar",
    registrationLimit: 100,
    eventTags: "Renewable Energy, Sustainability",
    coverImage: "",
    agenda: [
      { time: "14:00", description: "Solar Power Innovations" },
      { time: "16:00", description: "Wind Energy Potential" },
    ],
    speakers: [
      { name: "Ms. Laura Green", bio: "Sustainability Advocate" },
      { name: "Dr. Alan Watts", bio: "Renewable Energy Scientist" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Blockchain for Business",
    eventDescription:
      "A workshop focused on how blockchain can revolutionize business operations.",
    eventDate: "2024-12-13",
    eventTime: "09:00",
    eventLocation: "Business Hub, City D",
    eventCategory: "Workshop",
    registrationLimit: 80,
    eventTags: "Blockchain, Business, Technology",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Introduction to Blockchain" },
      { time: "11:00", description: "Blockchain Applications in Business" },
    ],
    speakers: [
      { name: "Mr. David Block", bio: "Blockchain Consultant" },
      { name: "Dr. Susan Chain", bio: "Blockchain Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Smart Cities: Designing the Future",
    eventDescription:
      "A conference focusing on smart city technology and urban innovation.",
    eventDate: "2024-12-14",
    eventTime: "08:30",
    eventLocation: "Urban Innovations Expo, City E",
    eventCategory: "Conference",
    registrationLimit: 250,
    eventTags: "Smart Cities, Urban Planning, Technology",
    coverImage: "",
    agenda: [
      { time: "08:30", description: "Introduction to Smart Cities" },
      { time: "10:30", description: "IoT in Urban Management" },
    ],
    speakers: [
      { name: "Mr. George Urban", bio: "Smart Cities Specialist" },
      { name: "Ms. Clara Vision", bio: "Urban Planner" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Cybersecurity Trends and Challenges",
    eventDescription:
      "An in-depth seminar on current cybersecurity trends and upcoming challenges.",
    eventDate: "2024-12-15",
    eventTime: "11:00",
    eventLocation: "Tech Security Summit, City F",
    eventCategory: "Seminar",
    registrationLimit: 120,
    eventTags: "Cybersecurity, Technology, Security",
    coverImage: "",
    agenda: [
      { time: "11:00", description: "Emerging Threats in Cybersecurity" },
      { time: "13:00", description: "Building Robust Cybersecurity Systems" },
    ],
    speakers: [
      { name: "Mr. John Security", bio: "Cybersecurity Expert" },
      { name: "Ms. Lisa Guard", bio: "Security Systems Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Autonomous Vehicles: The Road Ahead",
    eventDescription:
      "A discussion on the future of autonomous vehicles and the technology behind them.",
    eventDate: "2024-12-16",
    eventTime: "09:00",
    eventLocation: "Automotive Expo, City G",
    eventCategory: "Conference",
    registrationLimit: 180,
    eventTags: "Autonomous Vehicles, Technology, Innovation",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Introduction to Autonomous Vehicles" },
      { time: "11:00", description: "Challenges in Autonomous Driving" },
    ],
    speakers: [
      { name: "Mr. Albert Drive", bio: "Autonomous Vehicle Engineer" },
      { name: "Ms. Nora Lane", bio: "Self-Driving Technology Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Artificial Intelligence in Education",
    eventDescription:
      "How AI is transforming the landscape of education and learning.",
    eventDate: "2024-12-17",
    eventTime: "10:00",
    eventLocation: "EduTech Conference, City H",
    eventCategory: "Seminar",
    registrationLimit: 100,
    eventTags: "AI, Education, Technology",
    coverImage: "",
    agenda: [
      { time: "10:00", description: "AI in Personalized Learning" },
      { time: "12:00", description: "AI for Educational Assessment" },
    ],
    speakers: [
      { name: "Dr. Anna Teach", bio: "AI in Education Researcher" },
      { name: "Mr. Kevin Learn", bio: "Educational Technology Specialist" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "The Future of 5G Networks",
    eventDescription:
      "Exploring the possibilities and challenges of 5G networks.",
    eventDate: "2024-12-18",
    eventTime: "14:00",
    eventLocation: "5G Innovation Hub, City I",
    eventCategory: "Conference",
    registrationLimit: 200,
    eventTags: "5G, Technology, Innovation",
    coverImage: "",
    agenda: [
      { time: "14:00", description: "Introduction to 5G" },
      { time: "16:00", description: "Challenges in 5G Deployment" },
    ],
    speakers: [
      { name: "Dr. Max Signal", bio: "5G Technology Specialist" },
      { name: "Mr. Eve Network", bio: "Telecom Expert" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Tech Innovations Summit",
    eventDescription:
      "Exploring the latest trends and innovations in technology.",
    eventDate: "2024-12-19",
    eventTime: "09:00",
    eventLocation: "Convention Center, City J",
    eventCategory: "Conference",
    registrationLimit: 200,
    eventTags: "Technology, Innovation",
    coverImage: "",
    agenda: [
      { time: "09:00", description: "Keynote Speech" },
      { time: "11:00", description: "Panel Discussion" },
    ],
    speakers: [
      { name: "Dr. Emily Tech", bio: "Tech Visionary" },
      { name: "Mr. John Developer", bio: "Software Engineer" },
    ],
    attendeeList: "Public",
  },
  {
    eventTitle: "Sustainable Fashion Expo",
    eventDescription:
      "Showcasing sustainable fashion trends and eco-friendly designs.",
    eventDate: "2024-12-20",
    eventTime: "12:00",
    eventLocation: "Fashion Expo Center, City K",
    eventCategory: "Exhibition",
    registrationLimit: 150,
    eventTags: "Sustainable Fashion, Eco-friendly",
    coverImage: "",
    agenda: [
      { time: "12:00", description: "Sustainable Fabrics" },
      { time: "14:00", description: "Eco-friendly Design Innovations" },
    ],
    speakers: [
      { name: "Ms. Sophie Green", bio: "Sustainable Fashion Designer" },
      { name: "Mr. Liam Earth", bio: "Eco-fashion Advocate" },
    ],
    attendeeList: "Public",
  },
];

const admin = [
  {
    email: "admin1@example.com",
    password: "12345",
    token: "",
    name: "Risshab 1",
    role: "Admin",
  },
  {
    email: "admin2@example.com",
    password: "12345",
    token: "",
    name: "Risshab 2",
    role: "Admin",
  },
];

const users = [
  {
    email: "vinod2singla@gmail.com",
    password: "12345",
    token: "",
    name: "Risshab Singla",
    role: "User",
  },
  {
    email: "olivia.smith@example.com",
    password: "12345",
    token: "",
    name: "Olivia Smith",
    role: "User",
  },
  {
    email: "noah.johnson@example.com",
    password: "12345",
    token: "",
    name: "Noah Johnson",
    role: "User",
  },
  {
    email: "ava.williams@example.com",
    password: "12345",
    token: "",
    name: "Ava Williams",
    role: "User",
  },
  {
    email: "elijah.brown@example.com",
    password: "12345",
    token: "",
    name: "Elijah Brown",
    role: "User",
  },
  {
    email: "sophia.jones@example.com",
    password: "12345",
    token: "",
    name: "Sophia Jones",
    role: "User",
  },
  {
    email: "james.garcia@example.com",
    password: "12345",
    token: "",
    name: "James Garcia",
    role: "User",
  },
  {
    email: "mia.martinez@example.com",
    password: "12345",
    token: "",
    name: "Mia Martinez",
    role: "User",
  },
  {
    email: "benjamin.rodriguez@example.com",
    password: "12345",
    token: "",
    name: "Benjamin Rodriguez",
    role: "User",
  },
  {
    email: "amelia.lee@example.com",
    password: "12345",
    token: "",
    name: "Amelia Lee",
    role: "User",
  },
  {
    email: "lucas.walker@example.com",
    password: "12345",
    token: "",
    name: "Lucas Walker",
    role: "User",
  },
  {
    email: "harper.hall@example.com",
    password: "12345",
    token: "",
    name: "Harper Hall",
    role: "User",
  },
  {
    email: "henry.allen@example.com",
    password: "12345",
    token: "",
    name: "Henry Allen",
    role: "User",
  },
  {
    email: "evelyn.young@example.com",
    password: "12345",
    token: "",
    name: "Evelyn Young",
    role: "User",
  },
  {
    email: "alexander.king@example.com",
    password: "12345",
    token: "",
    name: "Alexander King",
    role: "User",
  },
  {
    email: "isabella.harris@example.com",
    password: "12345",
    token: "",
    name: "Isabella Harris",
    role: "User",
  },
  {
    email: "sebastian.scott@example.com",
    password: "12345",
    token: "",
    name: "Sebastian Scott",
    role: "User",
  },
  {
    email: "abigail.moore@example.com",
    password: "12345",
    token: "",
    name: "Abigail Moore",
    role: "User",
  },
  {
    email: "jackson.morris@example.com",
    password: "12345",
    token: "",
    name: "Jackson Morris",
    role: "User",
  },
  {
    email: "charlotte.hernandez@example.com",
    password: "12345",
    token: "",
    name: "Charlotte Hernandez",
    role: "User",
  },
  {
    email: "oliver.martin@example.com",
    password: "12345",
    token: "",
    name: "Oliver Martin",
    role: "User",
  },
  {
    email: "emily.smith@example.com",
    password: "12345",
    token: "",
    name: "Emily Smith",
    role: "User",
  },
  {
    email: "jackson.doe@example.com",
    password: "12345",
    token: "",
    name: "Jackson Doe",
    role: "User",
  },
  {
    email: "sophia.martin@example.com",
    password: "12345",
    token: "",
    name: "Sophia Martin",
    role: "User",
  },
  {
    email: "michael.brown@example.com",
    password: "12345",
    token: "",
    name: "Michael Brown",
    role: "User",
  },
  {
    email: "olivia.williams@example.com",
    password: "12345",
    token: "",
    name: "Olivia Williams",
    role: "User",
  },
  {
    email: "lucas.jones@example.com",
    password: "12345",
    token: "",
    name: "Lucas Jones",
    role: "User",
  },
  {
    email: "mia.davis@example.com",
    password: "12345",
    token: "",
    name: "Mia Davis",
    role: "User",
  },
  {
    email: "alexander.garcia@example.com",
    password: "12345",
    token: "",
    name: "Alexander Garcia",
    role: "User",
  },
  {
    email: "ella.miller@example.com",
    password: "12345",
    token: "",
    name: "Ella Miller",
    role: "User",
  },
  {
    email: "benjamin.lee@example.com",
    password: "12345",
    token: "",
    name: "Benjamin Lee",
    role: "User",
  },
  {
    email: "harper.moore@example.com",
    password: "12345",
    token: "",
    name: "Harper Moore",
    role: "User",
  },
  {
    email: "ethan.taylor@example.com",
    password: "12345",
    token: "",
    name: "Ethan Taylor",
    role: "User",
  },
  {
    email: "ava.anderson@example.com",
    password: "12345",
    token: "",
    name: "Ava Anderson",
    role: "User",
  },
  {
    email: "noah.thomas@example.com",
    password: "12345",
    token: "",
    name: "Noah Thomas",
    role: "User",
  },
  {
    email: "chloe.jackson@example.com",
    password: "12345",
    token: "",
    name: "Chloe Jackson",
    role: "User",
  },
  {
    email: "james.white@example.com",
    password: "12345",
    token: "",
    name: "James White",
    role: "User",
  },
  {
    email: "natalie.harris@example.com",
    password: "12345",
    token: "",
    name: "Natalie Harris",
    role: "User",
  },
  {
    email: "henry.clark@example.com",
    password: "12345",
    token: "",
    name: "Henry Clark",
    role: "User",
  },
  {
    email: "lucy.walker@example.com",
    password: "12345",
    token: "",
    name: "Lucy Walker",
    role: "User",
  },
  {
    email: "samuel.garcia@example.com",
    password: "12345",
    token: "",
    name: "Samuel Garcia",
    role: "User",
  },
];

const pastEventIds = [];
const allEventIds = [];

function getRandomDate(offsetType) {
  const today = new Date();
  let randomOffset;

  switch (offsetType) {
    case "past":
      randomOffset = Math.floor(Math.random() * 16) - 5;
      break;
    case "today":
      randomOffset = 0;
      break;
    case "future":
      randomOffset = Math.floor(Math.random() * 30) + 1;
      break;
    default:
      randomOffset = 0;
  }

  const randomDate = new Date(today);
  randomDate.setDate(today.getDate() + randomOffset);
  const formattedDate = randomDate.toISOString().split("T")[0];
  return formattedDate;
}

function generateEventDates(totalEvents) {
  const eventDates = [];

  const pastCount = Math.min(10, totalEvents);
  for (let i = 0; i < pastCount; i++) {
    eventDates.push(getRandomDate("past"));
  }

  const todayCount = Math.min(2, totalEvents - pastCount);
  for (let i = 0; i < todayCount; i++) {
    eventDates.push(getRandomDate("today"));
  }

  const futureCount = totalEvents - pastCount - todayCount;
  for (let i = 0; i < futureCount; i++) {
    eventDates.push(getRandomDate("future"));
  }

  return eventDates.sort(() => Math.random() - 0.5);
}

async function registerAndLoginUser(user) {
  try {
    const signupResponse = await axios.post(`${baseUrl}/auth/signup`, user);
    console.log(`Signup Response (${user.role}):`, signupResponse.data);

    const loginResponse = await axios.post(`${baseUrl}/auth/login`, {
      email: user.email,
      password: user.password,
    });

    console.log(`Login Token (${user.role}):`, loginResponse.data.token);

    return {
      id: signupResponse.data.id,
      token: loginResponse.data.token,
    };
  } catch (error) {
    console.error(
      `Failed to register/login user ${user.email}:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

async function createEvent(event, token) {
  try {
    const response = await axios.post(`${baseUrl}/events/create`, event, {
      headers: { Authorization: `Bearer ${token}` },
    });

    allEventIds.push(response.data.id);
    console.log("Event Created");
    // console.log(
    //   `Event "${event.eventTitle}" created successfully:`,
    //   response.data
    // );
    return response.data.id;
  } catch (error) {
    console.error(
      `Failed to create event "${event.eventTitle}":`,
      error.response?.data || error.message
    );
  }
}

async function registerForEvents2(eventIds, token) {
  const registrationPromises = eventIds.map(
    async (eventId) =>
      await axios
        .post(
          `${baseUrl}/events/register/${eventId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          console.log(`User registered for event ID ${eventId}`);
        })
        .catch((error) => {
          console.error(
            `Failed to register user for event ID ${eventId}:`,
            error.response?.data || error.message
          );
        })
  );

  await Promise.all(registrationPromises);
}

async function markAttendanceForUsers(users, pastEventIds) {
  const totalUsers = users.length;
  const presentCount = Math.floor(totalUsers * 0.8);
  const attendancePromises = [];
  let number = 0;
  for (const eventId of pastEventIds) {
    const usersMarkedPresent = new Set();

    while (usersMarkedPresent.size < presentCount) {
      const randomIndex = Math.floor(Math.random() * totalUsers);
      usersMarkedPresent.add(users[randomIndex].id);
    }

    for (const user of users) {
      if (usersMarkedPresent.has(user.id)) {
        attendancePromises.push(markAttendance(user.id, eventId));
        number++;
      }
    }
  }
  await Promise.all(attendancePromises);
  console.log("Total number is : ", number);
}

async function markAttendance(userId, eventId) {
  try {
    const response = await axios.post(
      `${baseUrl}/events/markAttendance/${eventId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${admin[0].token}`,
        },
      }
    );
    // console.log(response.data);

    console.log(`Attendance for ${userId} for event ${eventId} marked `);
  } catch (error) {
    console.error(
      `Failed to mark attendance for user ${userId} for event ${eventId}:`,
      error
    );
  }
}

async function main() {
  const totalEvents = events.length;

  const eventDates = generateEventDates(totalEvents);

  events.forEach((event, index) => {
    event.eventDate = eventDates[index];
  });

  try {
    const admin1 = await registerAndLoginUser(admin[0]);
    admin[0].token = admin1.token;
    admin[0].id = admin1.id;
  } catch (err) {
    console.log("Error in admin creation 1");
  }

  try {
    const admin2 = await registerAndLoginUser(admin[1]);
    admin[1].token = admin2.token;
    admin[1].id = admin2.id;
  } catch (err) {
    console.log("Error in admin creation 2");
  }

  try {
    const today = new Date();
    for (const event of events.slice(0, 20)) {
      const eventDate = new Date(event.eventDate);
      const eventId = await createEvent(event, admin[0].token);
      if (eventDate <= today) {
        pastEventIds.push(eventId);
      }
    }
    for (const event of events.slice(20)) {
      const eventDate = new Date(event.eventDate);
      const eventId = await createEvent(event, admin[1].token);
      if (eventDate <= today) {
        pastEventIds.push(eventId);
      }
    }
  } catch (err) {
    console.log("Error in event creation");
  }

  for (const user of users) {
    const userResponse = await registerAndLoginUser(user);
    user.token = userResponse.token;
    user.id = userResponse.id;
  }

  const registrationPromises = users.map(async (user) => {
    await registerForEvents2(allEventIds, user.token);
  });

  await Promise.all(registrationPromises);

  console.log("All users registered for all events.");
  console.log(pastEventIds);
  console.log(allEventIds);

  await markAttendanceForUsers(users, pastEventIds);
}

main();
