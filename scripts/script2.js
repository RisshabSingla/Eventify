import axios from "axios";

import { admin, users, events, feedbackTemplates } from "./dummyData.js";

const baseUrl = "http://localhost:8080";

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
  return randomDate.toISOString().split("T")[0];
}

function generateEventDates(totalEvents) {
  const eventDates = [];
  const pastCount = Math.min(15, totalEvents);
  const todayCount = Math.min(3, totalEvents - pastCount);
  const futureCount = totalEvents - pastCount - todayCount;

  for (let i = 0; i < pastCount; i++) {
    eventDates.push(getRandomDate("past"));
  }
  for (let i = 0; i < todayCount; i++) {
    eventDates.push(getRandomDate("today"));
  }
  for (let i = 0; i < futureCount; i++) {
    eventDates.push(getRandomDate("future"));
  }

  return eventDates.sort(() => Math.random() - 0.5);
}

async function registerAndLoginUser(user) {
  try {
    const signupResponse = await axios.post(`${baseUrl}/auth/signup`, user);
    const loginResponse = await axios.post(`${baseUrl}/auth/login`, {
      email: user.email,
      password: user.password,
    });

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
    return response.data.id;
  } catch (error) {
    console.error(
      `Failed to create event "${event.eventTitle}":`,
      error.response?.data || error.message
    );
    throw error;
  }
}

async function markAttendanceForUsers(users, pastEventIds) {
  const totalUsers = users.length;
  const presentCount = Math.floor(totalUsers * 0.8);
  const attendancePromises = [];

  for (const eventId of pastEventIds) {
    const usersMarkedPresent = new Set();

    while (usersMarkedPresent.size < presentCount) {
      const randomIndex = Math.floor(Math.random() * totalUsers);
      usersMarkedPresent.add(users[randomIndex].id);
    }

    for (const userId of usersMarkedPresent) {
      attendancePromises.push(markAttendance(userId, eventId));
    }
  }

  await Promise.all(attendancePromises);
  console.log(`Attendance marked for ${attendancePromises.length} records.`);
}

async function markAttendance(userId, eventId) {
  try {
    await axios.post(
      `${baseUrl}/events/markAttendance/${eventId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${admin[0].token}`,
        },
      }
    );
    console.log(`Attendance for ${userId} for event ${eventId} marked.`);
  } catch (error) {
    console.error(
      `Failed to mark attendance for user ${userId} for event ${eventId}:`,
      error.response?.data || error.message
    );
  }
}

async function registerUsersForEvent(eventId, users) {
  const registrationPromises = users.map((user) => {
    return axios
      .post(
        `${baseUrl}/events/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .catch((error) => {
        console.error(
          `Failed to register user ${user.token} for event ID ${eventId}:`,
          error.response?.data || error.message
        );
      });
  });

  await Promise.all(registrationPromises);
  console.log(`Users registered for event ID ${eventId}.`);
}

function getRandomFeedback() {
  return feedbackTemplates[
    Math.floor(Math.random() * feedbackTemplates.length)
  ];
}

async function giveFeedback(eventId, user, feedback) {
  try {
    await axios.post(`${baseUrl}/feedback/giveFeedback/${eventId}`, feedback, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    console.log(`Feedback submitted by user ${user.id} for event ${eventId}.`);
  } catch (error) {
    console.error(
      `Failed to submit feedback for user ${user.id} and event ${eventId}:`,
      error.response?.data || error.message
    );
  }
}

async function populateFeedbacks(users) {
  const feedbackPromises = [];

  for (const eventId of pastEventIds) {
    for (const user of users) {
      const feedback = getRandomFeedback();
      feedbackPromises.push(giveFeedback(eventId, user, feedback));
    }
  }

  await Promise.all(feedbackPromises);
  console.log("Feedback population completed.");
}

async function main() {
  const totalEvents = events.length;
  const eventDates = generateEventDates(totalEvents);
  events.forEach((event, index) => {
    event.eventDate = eventDates[index];
  });

  try {
    const [admin1, admin2] = await Promise.all(
      admin.map((adminUser) => registerAndLoginUser(adminUser))
    );

    admin[0].id = admin1.id;
    admin[0].token = admin1.token;
    admin[1].id = admin2.id;
    admin[1].token = admin2.token;
  } catch (err) {
    console.error("Error in admin creation.", err);
    return;
  }

  try {
    const today = new Date();
    const eventCreationPromises = events.map(async (event, index) => {
      const adminToken = index < 20 ? admin[0].token : admin[1].token;
      const eventDate = new Date(event.eventDate);
      const eventId = await createEvent(event, adminToken);
      if (eventDate <= today) pastEventIds.push(eventId);
    });

    await Promise.all(eventCreationPromises);
  } catch (err) {
    console.error("Error in event creation", err);
    return;
  }

  try {
    const userRegistrationPromises = users.map((user) =>
      registerAndLoginUser(user).then((userResponse) => {
        user.id = userResponse.id;
        user.token = userResponse.token;
      })
    );

    await Promise.all(userRegistrationPromises);
  } catch (err) {
    console.error("Error in user registration", err);
    return;
  }

  try {
    const registrationPromises = allEventIds.map((eventId) =>
      registerUsersForEvent(eventId, users)
    );

    await Promise.all(registrationPromises);
    console.log("All users registered for all events.");
  } catch (err) {
    console.error("Error in user-event registration", err);
    return;
  }

  await markAttendanceForUsers(users, pastEventIds);
  await populateFeedbacks(users);
}

main().catch((err) => console.error("Error in main execution", err));
