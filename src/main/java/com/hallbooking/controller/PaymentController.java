package com.hallbooking.controller;

import com.hallbooking.model.Booking;
import com.hallbooking.model.Payment;
import com.hallbooking.repository.BookingRepository;
import com.hallbooking.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentController(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody Map<String, Object> payload) {
        String bookingId = (String) payload.get("bookingId");
        String paymentMethod = (String) payload.getOrDefault("paymentMethod", "UPI");
        String upiId = (String) payload.getOrDefault("upiId", "");
        Double amount = Double.valueOf(payload.getOrDefault("amount", 0).toString());

        String transactionId = "TXN-" + (int)(10000000 + Math.random() * 90000000);

        Payment payment = new Payment(bookingId, transactionId, amount, paymentMethod, upiId, "SUCCESS");
        paymentRepository.save(payment);

        // Update booking paymentStatus to Paid
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setPaymentStatus("Paid");
            booking.setPaymentMethod(paymentMethod);
            bookingRepository.save(booking);
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "transactionId", transactionId,
                "amount", amount,
                "bookingId", bookingId,
                "paymentMethod", paymentMethod
        ));
    }
}
