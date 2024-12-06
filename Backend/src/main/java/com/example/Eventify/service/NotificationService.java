package com.example.Eventify.service;


import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.response.AdminNotificationsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

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
}
