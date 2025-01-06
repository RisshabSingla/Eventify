package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.User;
import com.example.Eventify.model.UserStatus;
import com.example.Eventify.response.EventAttendanceExportResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class DocumentExportService {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    public byte[] generateAttendanceExcelforEvents(List<EventAttendanceExportResponse.EventAttendanceData> events) throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            for (EventAttendanceExportResponse.EventAttendanceData event : events) {
                String sheetName = generateUniqueSheetName(workbook, event.getEventName());
                Sheet sheet = workbook.createSheet(sheetName);
                createHeaderRow(sheet);

                int rowIndex = 1;
                for (EventAttendanceExportResponse.AttendanceUser user : event.getUserStatuses()) {
                    Row row = sheet.createRow(rowIndex++);
                    row.createCell(0).setCellValue(user.getName());
                    row.createCell(1).setCellValue(user.getEmail());
                    row.createCell(2).setCellValue(user.getCurrentStatus());
                    row.createCell(3).setCellValue(user.getAttendanceCode());
                    row.createCell(4).setCellValue(user.getRegisteredDate());
                }

                for (int i = 0; i < 5; i++) {
                    sheet.autoSizeColumn(i);
                }
            }

            // Convert the workbook to a byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    private String generateUniqueSheetName(XSSFWorkbook workbook, String originalName) {
        final int MAX_LENGTH = 31;
        String trimmedName = originalName.length() > MAX_LENGTH
                ? originalName.substring(0, MAX_LENGTH)
                : originalName;
        String uniqueName = trimmedName;
        int counter = 1;

        while (workbook.getSheet(uniqueName) != null) {
            String suffix = "-" + counter++;
            int maxLength = MAX_LENGTH - suffix.length();
            uniqueName = trimmedName.substring(0, Math.min(trimmedName.length(), maxLength)) + suffix;
        }
        return uniqueName;
    }

    private void createHeaderRow(Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Name");
        headerRow.createCell(1).setCellValue("Email");
        headerRow.createCell(2).setCellValue("Current Status");
        headerRow.createCell(3).setCellValue("Attendance Code");
        headerRow.createCell(4).setCellValue("Registered Date");
    }

    public byte[] generateAttendanceExcelforEvent(List<UserStatus> userStatuses) throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Attendance");
            createHeaderRow(sheet);

            CellStyle dateTimeCellStyle = workbook.createCellStyle();
            CreationHelper createHelper = workbook.getCreationHelper();
            dateTimeCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")); // ISO 8601 UTC format

            SimpleDateFormat utcFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            utcFormat.setTimeZone(TimeZone.getTimeZone("UTC")); // Set to UTC

            int rowIndex = 1;
            for (UserStatus userStatus : userStatuses) {
                Row row = sheet.createRow(rowIndex++);
                row.createCell(0).setCellValue(userStatus.getUserId().getName());
                row.createCell(1).setCellValue(userStatus.getUserId().getEmail());
                row.createCell(2).setCellValue(userStatus.getCurrentStatus());
                row.createCell(3).setCellValue(userStatus.getAttendanceCode());
                Date registeredDate = userStatus.getRegisteredDate(); // Assuming this is a java.util.Date
                Cell cell = row.createCell(4);
                if (registeredDate != null) {
                    cell.setCellValue(utcFormat.format(registeredDate)); // Convert to UTC string
                } else {
                    cell.setCellValue("N/A"); // Handle null case
                }
                cell.setCellStyle(dateTimeCellStyle);
            }

            for (int i = 0; i < 5; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convert the workbook to a byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }


    public byte[] generateMostPopularEventsExcel() {
        List<Event> mostPopularEvents = eventService.getMostPopularEvents(); // Replace with appropriate method
        return createExcelFromEvents("Most Popular Events", mostPopularEvents);
    }

    public byte[] generateUpcomingEventsExcel() {
        List<Event> upcomingEvents = eventService.getUpcomingEvents(); // Replace with appropriate method
        return createExcelFromEvents("Upcoming Events", upcomingEvents);
    }

    public byte[] generateActiveUsersExcel() {
        List<User> activeUsers = userService.getActiveUsers(); // Replace with appropriate method
        return createExcelFromUsers("Active Users", activeUsers);
    }

    public byte[] generateNewRegistrationsExcel() {
        List<User> newRegistrations = userService.getNewRegistrations(); // Replace with appropriate method
        return createExcelFromUsers("New Registrations", newRegistrations);
    }

    private byte[] createExcelFromEvents(String sheetName, List<Event> events) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet(sheetName);

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"Event Name", "Date", "Description", "Location"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            cell.setCellStyle(headerStyle);
        }

        // Populate rows with event data
        int rowIndex = 1;
        for (Event event : events) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(event.getName());
            row.createCell(1).setCellValue(event.getDate());
            row.createCell(2).setCellValue(event.getDescription());
            row.createCell(3).setCellValue(event.getLocation());
        }

        return writeWorkbookToByteArray(workbook);
    }

    private byte[] createExcelFromUsers(String sheetName, List<User> users) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet(sheetName);

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"Id","Email", "Name", "Phone Number"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            cell.setCellStyle(headerStyle);
        }

        // Populate rows with user data
        int rowIndex = 1;
        for (User user : users) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(user.getId());
            row.createCell(1).setCellValue(user.getEmail());
            row.createCell(2).setCellValue(user.getName());
            row.createCell(3).setCellValue(user.getPhoneNumber());
        }

        return writeWorkbookToByteArray(workbook);
    }

    private byte[] writeWorkbookToByteArray(Workbook workbook) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 0; i < sheet.getRow(0).getPhysicalNumberOfCells(); i++) {
                sheet.autoSizeColumn(i);
            }
            workbook.write(outputStream);
            workbook.close();
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error generating Excel file", e);
        }
    }
}
