package com.hallbooking.repository;

import com.hallbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    List<Booking> findByStatus(String status);
    List<Booking> findAllByOrderByCreatedAtDesc();
}
