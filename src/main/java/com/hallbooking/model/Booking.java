package com.hallbooking.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    private String id; // e.g., "HB-8842"

    private String hallId;
    private String hallName;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String eventType;
    private Integer guestCount;

    private LocalDate startDate;
    private LocalDate endDate;

    private String startTime; // e.g. "09:00 AM"
    private String endTime;   // e.g. "10:00 PM"

    private Double totalAmount;

    @Column(nullable = false)
    private String status; // Always "Pending" by default

    private String paymentStatus; // "Pending", "Paid", "Refunded"
    private String paymentMethod; // "UPI", "Credit Card", "Cash on Venue"

    @Column(columnDefinition = "TEXT")
    private String notes;

    private LocalDateTime createdAt;

    public Booking() {
        this.status = "Pending";
        this.paymentStatus = "Pending";
        this.createdAt = LocalDateTime.now();
    }

    public Booking(String id, String hallId, String hallName, String userName, String userEmail, String userPhone, String eventType, Integer guestCount, LocalDate startDate, LocalDate endDate, String startTime, String endTime, Double totalAmount, String paymentMethod) {
        this.id = id;
        this.hallId = hallId;
        this.hallName = hallName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.eventType = eventType;
        this.guestCount = guestCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime != null ? startTime : "09:00 AM";
        this.endTime = endTime != null ? endTime : "10:00 PM";
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod != null ? paymentMethod : "UPI";
        this.status = "Pending";
        this.paymentStatus = "Pending";
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getHallId() { return hallId; }
    public void setHallId(String hallId) { this.hallId = hallId; }

    public String getHallName() { return hallName; }
    public void setHallName(String hallName) { this.hallName = hallName; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserPhone() { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public Integer getGuestCount() { return guestCount; }
    public void setGuestCount(Integer guestCount) { this.guestCount = guestCount; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
