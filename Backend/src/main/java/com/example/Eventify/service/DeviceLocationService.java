package com.example.Eventify.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class DeviceLocationService {

    // Method to extract device and browser info from the User-Agent header
    public String getDeviceDetails(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        return "Device: " + userAgent;
    }

    // Method to get the IP address from the HTTP request
    public String getIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }

    // Method to get the location from the IP address using an external API (e.g., ip-api.com)
    public String getLocation(String ipAddress) {
        return "Location: Some City, Some Country";
    }
}
