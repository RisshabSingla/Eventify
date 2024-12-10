package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.request.UserDetailsUpdateRequest;
import com.example.Eventify.response.UserDashboardItemsResponse;
import com.example.Eventify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/users")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> authenticatedUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                System.out.println("User not authenticated");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(currentUser);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getUserDashboardDetails")
    public ResponseEntity<?> getUserDashboardDetails() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                System.out.println("User not authenticated");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(userService.getUserDashboardDetails(currentUser));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping("/updateUserDetails")
    public ResponseEntity<?> updateUserDetails(@RequestBody UserDetailsUpdateRequest updateRequestData) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
            }

            User currentUser = (User) authentication.getPrincipal();

            userService.updateUser(currentUser, updateRequestData);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }


    @GetMapping("/getUserDetails")
    public ResponseEntity<?> getUserDetails() {
        try {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }

        User currentUser = (User) authentication.getPrincipal();

            return ResponseEntity.ok(userService.getUserDetails(currentUser));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }
}
