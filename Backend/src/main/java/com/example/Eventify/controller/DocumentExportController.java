package com.example.Eventify.controller;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.User;
import com.example.Eventify.model.UserStatus;
import com.example.Eventify.response.EventAttendanceExportResponse;
import com.example.Eventify.service.DocumentExportService;
import com.example.Eventify.service.EventService;
import com.example.Eventify.service.UserStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/export")
public class DocumentExportController {

    @Autowired
    private DocumentExportService documentExportService;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserStatusService userStatusService;


    @GetMapping("/exportAllEventAttendance")
    public ResponseEntity<byte[]> exportAttendance() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        try {
            List<EventAttendanceExportResponse.EventAttendanceData> events = eventService.getEventsWithAttendanceForUser(currentUser);
            System.out.println(events.size());
            byte[] excelData = documentExportService.generateAttendanceExcelforEvents(events);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=allEventsAttendance.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exportEventAttendance/{eventId}")
    public ResponseEntity<byte[]> exportEventAttendance(@PathVariable String eventId) {

        try {
            List<UserStatus> attendanceList = userStatusService.findUserStatusByEventId(eventId);
            System.out.println(attendanceList.size());

            byte[] excelData = documentExportService.generateAttendanceExcelforEvent(attendanceList);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=attendance.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exportMostPopularEvents")
    public ResponseEntity<byte[]> exportMostPopularEvents() {
        try {
            byte[] excelData = documentExportService.generateMostPopularEventsExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=most_popular_events.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.err.println("Error exporting most popular events: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exportUpcomingEvents")
    public ResponseEntity<byte[]> exportUpcomingEvents() {
        try {
            byte[] excelData = documentExportService.generateUpcomingEventsExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=upcoming_events.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.err.println("Error exporting upcoming events: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exportActiveUsers")
    public ResponseEntity<byte[]> exportActiveUsers() {
        try {
            byte[] excelData = documentExportService.generateActiveUsersExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=active_users.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.err.println("Error exporting active users: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exportNewRegistrations")
    public ResponseEntity<byte[]> exportNewRegistrations() {
        try {
            byte[] excelData = documentExportService.generateNewRegistrationsExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=new_registrations.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.err.println("Error exporting new registrations: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

}

