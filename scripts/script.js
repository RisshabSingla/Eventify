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
  const formattedDate = randomDate.toISOString().split("T")[0];
  return formattedDate;
}

function generateEventDates(totalEvents) {
  const eventDates = [];

  const pastCount = Math.min(15, totalEvents);
  for (let i = 0; i < pastCount; i++) {
    eventDates.push(getRandomDate("past"));
  }

  const todayCount = Math.min(3, totalEvents - pastCount);
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

async function markAttendanceForUsers(users, pastEventIds) {
  const totalUsers = users.length;
  const presentCount = Math.floor(totalUsers * 0.8);
  let number = 0;
  for (const eventId of pastEventIds) {
    const usersMarkedPresent = new Set();

    while (usersMarkedPresent.size < presentCount) {
      const randomIndex = Math.floor(Math.random() * totalUsers);
      usersMarkedPresent.add(users[randomIndex].id);
    }

    for (const user of users) {
      if (usersMarkedPresent.has(user.id)) {
        await markAttendance(user.id, eventId);
        number++;
      }
    }
  }
  console.log("Total attendance marked: ", number);
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

async function registerUsersForEvent(eventId, users) {
  for (const user of users) {
    try {
      await axios.post(
        `${baseUrl}/events/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(`User ${user.token} registered for event ID ${eventId}`);
    } catch (error) {
      console.error(
        `Failed to register user ${user.token} for event ID ${eventId}:`,
        error.response?.data || error.message
      );
    }
  }
}

function getRandomFeedback() {
  return feedbackTemplates[
    Math.floor(Math.random() * feedbackTemplates.length)
  ];
}

// Function to give feedback for a user and event
async function giveFeedback(eventId, user, feedback) {
  try {
    const response = await axios.post(
      `${baseUrl}/feedback/giveFeedback/${eventId}`,
      feedback,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    // console.log(response.data);
    console.log(`Feedback submitted by user ${user.id} for event ${eventId}`);
  } catch (error) {
    console.error(
      `Failed to submit feedback for user ${user.id} and event ${eventId}:`,
      error.response?.data || error.message
    );
  }
}

// Main function to populate feedbacks
async function populateFeedbacks() {
  for (const eventId of pastEventIds) {
    for (const user of users) {
      const feedback = getRandomFeedback();
      await giveFeedback(eventId, user, feedback);
    }
  }
  console.log("Feedback population completed.");
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

  for (const eventId of allEventIds) {
    await registerUsersForEvent(eventId, users);
  }

  console.log("All users registered for all events.");
  console.log(pastEventIds);
  console.log(allEventIds);

  await markAttendanceForUsers(users, pastEventIds);

  await populateFeedbacks();
}

main();
