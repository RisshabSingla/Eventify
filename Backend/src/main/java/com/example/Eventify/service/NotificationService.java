package com.example.Eventify.service;


import com.example.Eventify.model.Event;
import com.example.Eventify.model.Notification;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.NotificationSendRequest;
import com.example.Eventify.response.AdminNotificationsResponse;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    EventRepository eventRepository;

    public List<AdminNotificationsResponse> getAdminNotifications() {

        return notificationRepository
                .findAll().stream()
                .map(notification -> {
                    return new AdminNotificationsResponse(
                            notification.getType(),
                            notification.getDescription(),
                            notification.getTimeStamp(),
                            notification.getEventId() != null ? notification.getEventId().getId() : ""
                    );
                })
                .toList();

    }


    public boolean sendNotification(NotificationSendRequest notificationSendRequest) throws MessagingException {

        Notification notification;
        if (Objects.equals(notificationSendRequest.getEventId(), "All")) {
            List<User> allUsers = userRepository.findAll();

            for (User user : allUsers) {
                emailService.sendEmail(user.getEmail(), "Admin Notification", notificationSendRequest.getMessage());
            }

            notification = new Notification().setType("Custom Notification").setDescription("Notification sent to all people " + notificationSendRequest.getMessage()).setTimeStamp(new Date());

        } else{
            Event event = eventRepository.findById(notificationSendRequest.getEventId()).orElse(null);

            if (event == null) {
                return false;
            }

            List<User> registeredUsers = event.getRegisteredUsers();

            for (User user : registeredUsers) {
                emailService.sendEmail(user.getEmail(), "Admin Notification", notificationSendRequest.getMessage());
            }

            notification = new Notification().setDescription("Notification sent to all people for people in event: " + event.getName()).setType("Custom Notification").setEventId(event).setTimeStamp(new Date());
        }

        notificationRepository.save(notification);

        return true;
    }
}
