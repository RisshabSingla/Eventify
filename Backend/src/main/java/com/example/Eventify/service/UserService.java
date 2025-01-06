package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.Feedback;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.UserDetailsUpdateRequest;
import com.example.Eventify.response.UserDashboardItemsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    UserRepository userRepository;

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
}
