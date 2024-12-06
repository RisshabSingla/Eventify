package com.example.Eventify.controller;

import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.response.AdminNotificationsResponse;
import com.example.Eventify.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/notifications")
@RestController
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/getAdminNotifications")
    public ResponseEntity<List<AdminNotificationsResponse>> getAdminNotifications() {
        System.out.println("Hello");
        return ResponseEntity.ok(notificationService.getAdminNotifications());
    }
}
