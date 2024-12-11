package com.example.Eventify.service;


import com.example.Eventify.model.UserStatus;
import com.example.Eventify.response.EventAttendanceExportResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;


@Service
public class DocumentExportService {

    public byte[] generateAttendanceExcelforEvents(List<EventAttendanceExportResponse.EventAttendanceData> events) throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            for (EventAttendanceExportResponse.EventAttendanceData event : events) {
                // Create a new sheet for each event
                Sheet sheet = workbook.createSheet(event.getEventName() + UUID.randomUUID());
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

            int rowIndex = 1;
            for (UserStatus userStatus : userStatuses) {
                Row row = sheet.createRow(rowIndex++);
                row.createCell(0).setCellValue(userStatus.getUserId().getName());
                row.createCell(1).setCellValue(userStatus.getUserId().getEmail());
                row.createCell(2).setCellValue(userStatus.getCurrentStatus());
                row.createCell(3).setCellValue(userStatus.getAttendanceCode());
                row.createCell(4).setCellValue(userStatus.getRegisteredDate());
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

}
