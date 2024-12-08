package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.Feedback;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.UserDetailsUpdateRequest;
import com.example.Eventify.response.UserDashboardItemsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
