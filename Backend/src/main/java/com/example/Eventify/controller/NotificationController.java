package com.example.Eventify.controller;

import com.example.Eventify.request.NotificationSendRequest;
import com.example.Eventify.response.AdminNotificationsResponse;
import com.example.Eventify.service.NotificationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/notifications")
@RestController
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/getAdminNotifications")
    public ResponseEntity<List<AdminNotificationsResponse>> getAdminNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            return ResponseEntity.ok(notificationService.getAdminNotifications(page, size));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("sendNotification")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationSendRequest notificationSendRequest)
            throws MessagingException {

        boolean notificationSent = notificationService.sendNotification(notificationSendRequest);

        if (notificationSent) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
