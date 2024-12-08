package com.example.Eventify.controller;


import com.example.Eventify.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Endpoint to send a simple email
    @PostMapping("/send")
    public String sendEmail(@RequestParam String to,
                            @RequestParam String subject,
                            @RequestParam String text) {
        try {
            emailService.sendEmail(to, subject, text);
            return "Email sent successfully!";
        } catch (Exception e) {
            System.out.println(e);
            return "Error sending email!";
        }
    }
}

