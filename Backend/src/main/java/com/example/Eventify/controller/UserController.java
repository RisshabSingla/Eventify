package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.request.UserDetailsUpdateRequest;
import com.example.Eventify.response.UserDashboardItemsResponse;
import com.example.Eventify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }


    @GetMapping("/getUserDashboardDetails")
    public ResponseEntity<UserDashboardItemsResponse> getUserDashboardDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(userService.getUserDashboardDetails(currentUser));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping("/updateUserDetails")
    public ResponseEntity<?> updateUserDetails(@RequestBody UserDetailsUpdateRequest updateRequestData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        try{
            userService.updateUser(currentUser, updateRequestData);
            return ResponseEntity.ok().body(null);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }


    }
}
