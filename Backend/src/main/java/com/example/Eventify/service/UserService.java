package com.example.Eventify.service;

import com.example.Eventify.model.*;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.repository.UserStatusRepository;
import com.example.Eventify.request.UserDetailsUpdateRequest;
import com.example.Eventify.response.AdminDashboardItemsResponse;
import com.example.Eventify.response.UserDashboardItemsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    UserStatusRepository userStatusRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    NotificationRepository notificationRepository;

    public UserDashboardItemsResponse getUserDashboardDetails(User currentUser) {

        String profileImage = (currentUser.getProfileImage() != null) ? currentUser.getProfileImage() : "default-profile-image.png";
        String userName = (currentUser.getName() != null) ? currentUser.getName() : "Anonymous User";
        String userEmail = (currentUser.getEmail() != null) ? currentUser.getEmail() : "No Email Provided";
        String userPhone = (currentUser.getPhoneNumber() != null) ? currentUser.getPhoneNumber() : "No Phone Provided";

        List<Event> registeredEvents = (currentUser.getRegisteredEvents() != null) ? currentUser.getRegisteredEvents() : new ArrayList<>();
        int registeredEventsCount = registeredEvents.size();

        List<Feedback> feedbacksGiven = (currentUser.getFeedbacksGiven() != null) ? currentUser.getFeedbacksGiven() : new ArrayList<>();
        int feedbackGivenCount = feedbacksGiven.size();
        int upcomingEventsCount = 0;
        int eventsAttendedCount = 0;
        LocalDate currentDate = LocalDate.now();

        for (Event event : registeredEvents) {
            LocalDate eventDate = LocalDate.parse(event.getDate());
            if (eventDate.isAfter(currentDate)) {
                upcomingEventsCount++;
            }

            UserStatus userStatus = userStatusRepository.findByEventIdAndUserId(event.getId(), currentUser.getId());
            if (userStatus != null && "Present".equals(userStatus.getCurrentStatus())) {
                eventsAttendedCount++;
            }
        }

        return new UserDashboardItemsResponse()
                .setUserDetails(new UserDashboardItemsResponse.UserDetail()
                        .setUserImageUrl(profileImage)
                        .setUserName(userName)
                        .setUserEmail(userEmail)
                        .setPhoneNumber(userPhone))
                .setUserEventSummary(new UserDashboardItemsResponse.UserEventSummary()
                        .setRegisteredEvents(registeredEventsCount)
                        .setUpcomingEvents(upcomingEventsCount)
                        .setEventsAttended(eventsAttendedCount))
                .setUserStats(new UserDashboardItemsResponse.UserStats()
                        .setTotalEventsRegistered(registeredEventsCount)
                        .setFeedbackGiven(feedbackGivenCount));
    }



    public void updateUser(User currentUser, UserDetailsUpdateRequest updateRequestData) {

        System.out.println(updateRequestData.toString());
        if (updateRequestData.getUserName() != null && !updateRequestData.getUserName().isEmpty()) {
            currentUser.setName(updateRequestData.getUserName());
        }
        if (updateRequestData.getPhoneNumber() != null && !updateRequestData.getPhoneNumber().isEmpty()) {
            currentUser.setPhoneNumber(updateRequestData.getPhoneNumber());
        }
        if (updateRequestData.getUserImageUrl() != null && !updateRequestData.getUserImageUrl().isEmpty()) {
            currentUser.setProfileImage(updateRequestData.getUserImageUrl());
        }

        userRepository.save(currentUser);
    }


    public UserDashboardItemsResponse.UserDetail  getUserDetails(User currentUser){
        String profileImage = (currentUser.getProfileImage() != null) ? currentUser.getProfileImage() : "default-profile-image.png";
        String userName = (currentUser.getName() != null) ? currentUser.getName() : "Anonymous User";
        String userEmail = (currentUser.getEmail() != null) ? currentUser.getEmail() : "No Email Provided";
        String userPhone = (currentUser.getPhoneNumber() != null) ? currentUser.getPhoneNumber() : "No Phone Provided";


        return new UserDashboardItemsResponse.UserDetail()
                .setUserImageUrl(profileImage)
                .setUserName(userName)
                .setUserEmail(userEmail)
                .setPhoneNumber(userPhone);
    }


    public List<User> getActiveUsers() {
        // Define the date format used in your user dates
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust this pattern to match your date format

        // Fetch active users based on specific criteria (e.g., users who have attended an event or logged in recently)
        return userRepository.findAll().stream()
                .filter(user -> {
                    try {
                        LocalDate lastLoginDate = LocalDate.parse(user.getLastLogin(), formatter);
                        return lastLoginDate.isAfter(LocalDate.now().minusDays(30)); // Users active in the last 30 days
                    } catch (Exception e) {
                        // Handle parsing exceptions (e.g., invalid date format) gracefully
                        return false;
                    }
                })
                .collect(Collectors.toList());
    }

    public List<User> getNewRegistrations() {
        // Define the date format used in your user dates
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust this pattern to match your date format

        // Fetch users who registered within the past month
        return userRepository.findAll().stream()
                .filter(user -> {
                    try {
                        LocalDate registeredDate = LocalDate.parse(user.getRegisteredDate(), formatter);
                        return registeredDate.isAfter(LocalDate.now().minusDays(30)); // Users registered in the last 30 days
                    } catch (Exception e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());
    }


    public AdminDashboardItemsResponse getAdminDashboardData() {
        long totalUsers = userRepository.count();
        long totalEvents = eventRepository.count();

        String todayDate = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

        List<Notification> registrationsTodayList = notificationRepository.findByTypeAndTimeStampStartingWith("User Registration", todayDate);
        long registrationsToday = registrationsTodayList.size();
        List<AdminDashboardItemsResponse.Metric> metrics = List.of(
                new AdminDashboardItemsResponse.Metric("Total Users", totalUsers),
                new AdminDashboardItemsResponse.Metric("Total Events", totalEvents),
                new AdminDashboardItemsResponse.Metric("Registrations Today", registrationsToday)
        );

        List<Event> events = eventRepository.findAll();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime now = LocalDateTime.now();
        System.out.println(events);

        List<AdminDashboardItemsResponse.Event> upcomingEvents = events.stream()
                .filter(event -> {
                    try {
                        LocalDate eventDate = LocalDate.parse(event.getDate(), formatter);
                        LocalDateTime eventDateTime = eventDate.atStartOfDay();
                        return eventDateTime.isAfter(now);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                        return false;
                    }
                }).sorted((e1, e2) -> {
                    try {
                        LocalDateTime dateTime1 = LocalDate.parse(e1.getDate(), formatter).atStartOfDay();
                        LocalDateTime dateTime2 = LocalDate.parse(e2.getDate(), formatter).atStartOfDay();
                        return dateTime1.compareTo(dateTime2); // Sort by ascending date
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                        return 0;
                    }
                })             .map(event -> new AdminDashboardItemsResponse.Event()
                        .setId(event.getId())
                        .setName(event.getName())
                        .setDate(event.getDate())
                        .setTime(event.getTime())
                )
                .limit(10)
                .collect(Collectors.toList());

        List<Notification> notifications = notificationRepository.findTop10ByOrderByTimeStampDesc();

        List<AdminDashboardItemsResponse.Activity> recentActivities = notifications.stream()
                .map(notification -> new AdminDashboardItemsResponse.Activity()
                        .setDescription(notification.getType())
                        .setDetail(notification.getDescription())
                        .setTimestamp(String.valueOf(notification.getTimeStamp())))
                .collect(Collectors.toList());

        return new AdminDashboardItemsResponse()
                .setMetrics(metrics)
                .setUpcomingEvents(upcomingEvents)
                .setRecentActivities(recentActivities);
    }
}
