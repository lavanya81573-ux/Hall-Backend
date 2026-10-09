package com.hallbooking.controller;

import com.hallbooking.dto.BookingRequest;
import com.hallbooking.model.Booking;
import com.hallbooking.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings(@RequestParam(required = false) String userEmail) {
        if (userEmail != null && !userEmail.isEmpty()) {
            return ResponseEntity.ok(bookingRepository.findByUserEmailOrderByCreatedAtDesc(userEmail));
        }
        return ResponseEntity.ok(bookingRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable String id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest req) {
        String bookingId = "HB-" + (int)(1000 + Math.random() * 9000);
        Booking booking = new Booking(
                bookingId,
                req.getHallId(),
                req.getHallName(),
                req.getUserName(),
                req.getUserEmail(),
                req.getUserPhone(),
                req.getEventType(),
                req.getGuestCount(),
                req.getStartDate(),
                req.getEndDate(),
                req.getStartTime(),
                req.getEndTime(),
                req.getTotalAmount(),
                req.getPaymentMethod()
        );
        booking.setNotes(req.getNotes());
        booking.setStatus("Pending"); // Strictly default to Pending
        booking.setPaymentStatus("Pending");

        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String newStatus = payload.get("status"); // "Approved" or "Rejected" or "Cancelled"
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(newStatus);
            Booking saved = bookingRepository.save(booking);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }
}
