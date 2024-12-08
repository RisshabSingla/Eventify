package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.response.EventAttendanceExportResponse;
import com.example.Eventify.service.DocumentExportService;
import com.example.Eventify.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
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


    @GetMapping("/exportAllEventAttendance")
    public ResponseEntity<byte[]> exportAttendance() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        try {
            List<EventAttendanceExportResponse.EventAttendanceData> events = eventService.getEventsWithAttendanceForUser(currentUser);
            System.out.println(events.size());
            byte[] excelData = documentExportService.generateAttendanceExcel(events);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=attendance.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(null);
        }
    }

}
