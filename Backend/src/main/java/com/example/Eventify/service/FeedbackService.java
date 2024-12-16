package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.Feedback;
import com.example.Eventify.model.User;
import com.example.Eventify.model.UserStatus;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.FeedbackRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.repository.UserStatusRepository;
import com.example.Eventify.request.GiveFeedbackRequest;
import com.example.Eventify.response.FeedbackSubmitResponse;
import com.example.Eventify.response.MarkAttendanceResponse;
import com.example.Eventify.response.UserGivenFeedbackResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FeedbackService {


    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserStatusRepository userStatusRepository;

    public FeedbackSubmitResponse giveFeedback(String eventId, GiveFeedbackRequest feedbackRequest, User currentUser) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }

        UserStatus matchingStatus = userStatusRepository.findByEventIdAndUserId(eventId, currentUser.getId());

        if (matchingStatus == null) {
            return null;
        }

        if (!"Present".equals(matchingStatus.getCurrentStatus())) {
            return null;
        }

        Feedback newFeedback = new Feedback()
                .setUserId(currentUser)
                .setComments(feedbackRequest.getComments())
                .setOverallRating(feedbackRequest.getOverallRating())
                .setSpeakerRating(feedbackRequest.getSpeakerRating())
                .setVenueRating(feedbackRequest.getVenueRating())
                .setSuggestions(feedbackRequest.getFutureSuggestions())
                .setEventId(event)
                .setCreatedDate(new Date());

        feedbackRepository.save(newFeedback);

        if (currentUser.getFeedbacksGiven() == null) {
            currentUser.setFeedbacksGiven(new java.util.ArrayList<>());
        }
        currentUser.getFeedbacksGiven().add(newFeedback);

        userRepository.save(currentUser);

        if (event.getFeedbacks() == null) {
            event.setFeedbacks(new java.util.ArrayList<>());
        }
        event.getFeedbacks().add(newFeedback);

        eventRepository.save(event);

        return new FeedbackSubmitResponse()
                .setComments(newFeedback.getComments())
                .setOverallRating(newFeedback.getOverallRating())
                .setSpeakerRating(newFeedback.getSpeakerRating())
                .setVenueRating(newFeedback.getVenueRating())
                .setSuggestions(newFeedback.getSuggestions())
                .setId(newFeedback.getId());
    }

    public List<UserGivenFeedbackResponse> getFeedbacks(User currentUser) {

        if (currentUser.getFeedbacksGiven() == null) {
            return null;
        }
        return currentUser.getFeedbacksGiven().stream().map(feedback -> new UserGivenFeedbackResponse()
                        .setComments(feedback.getComments())
                        .setSpeakerRating(feedback.getSpeakerRating())
                        .setVenueRating(feedback.getVenueRating())
                        .setSuggestions(feedback.getSuggestions())
                        .setEventName(feedback.getEventId().getName())
                        .setDescription(feedback.getEventId().getDescription())
                        .setImage(feedback.getEventId().getCoverImage())
                        .setDate(feedback.getEventId().getDate())
                        .setLocation(feedback.getEventId().getLocation())
                        .setRating(feedback.getOverallRating())
                )
                .toList();
    }

}
