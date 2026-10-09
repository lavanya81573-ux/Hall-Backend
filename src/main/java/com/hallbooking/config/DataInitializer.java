package com.hallbooking.config;

import com.hallbooking.model.Booking;
import com.hallbooking.model.Hall;
import com.hallbooking.model.User;
import com.hallbooking.repository.BookingRepository;
import com.hallbooking.repository.HallRepository;
import com.hallbooking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final HallRepository hallRepository;
    private final BookingRepository bookingRepository;

    public DataInitializer(UserRepository userRepository, HallRepository hallRepository, BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.hallRepository = hallRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Users
        if (userRepository.count() == 0) {
            User admin = new User("System", "Admin", "admin@elitehall.com", "admin123", "+91 98765 00000", "ROLE_ADMIN");
            User user = new User("Rahul", "Sharma", "user@example.com", "user123", "+91 98765 43210", "ROLE_USER");
            userRepository.saveAll(List.of(admin, user));
        }

        // 2. Seed Halls (12 Event Categories)
        if (hallRepository.count() == 0) {
            List<Hall> initialHalls = List.of(
                new Hall("hall-1", "Elite Hall - Marriage Hall", "Marriage Hall", 1000, 50000.0, "MG Road, Central City", "Grand wedding palace with luxury chandelier decor and stage setup.", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-2", "Elite Hall - Baby Shower Hall", "Baby Shower Hall", 200, 18000.0, "Jubilee Hills, West Suburb", "Cozy pastel aesthetic hall for welcoming new babies.", "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-3", "Elite Hall - Birthday Party Hall", "Birthday Party Hall", 300, 22000.0, "Indiranagar, East Suburb", "Vibrant festive arena equipped with high-tech sound & balloon backdrop setup.", "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-4", "Elite Hall - Graduation Hall", "Graduation Hall", 500, 35000.0, "University Road, North Campus", "Academic auditorium with tiered seating, lectern, and LED display screen.", "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-5", "Elite Hall - Corporate Event Hall", "Corporate Event Hall", 400, 30000.0, "Tech Park Financial District", "Executive conference convention suite with dual 4K laser projectors.", "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-6", "Elite Hall - Engagement Hall", "Engagement Hall", 350, 25000.0, "Park Circus Promenade", "Intimate floral banquet setting crafted for dream engagement ring ceremonies.", "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-7", "Elite Hall - Reception Hall", "Reception Hall", 800, 45000.0, "Airport Boulevard, South City", "Majestic reception lounge featuring velvet banquet seating and live orchestra stage.", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-8", "Elite Hall - Anniversary Hall", "Anniversary Hall", 250, 20000.0, "Lakeside Drive, West Lake", "Romantic ambient dining hall with soft mood lighting for milestone celebrations.", "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-9", "Elite Hall - Naming Ceremony Hall", "Naming Ceremony Hall", 200, 16000.0, "Heritage Cultural Square", "Traditional warm acoustic hall decorated for auspicious naming rituals.", "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-10", "Elite Hall - Party & Celebration Hall", "Party & Celebration Hall", 600, 32000.0, "Downtown Entertainment Strip", "High-energy celebration ballroom with DJ booth, dancefloor, and bar setup.", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-11", "Elite Hall - Seminar & Conference Hall", "Seminar & Conference Hall", 450, 28000.0, "Business Bay Plaza", "Acoustically insulated seminar hall with wireless mics & high-speed Wi-Fi.", "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"),
                new Hall("hall-12", "Elite Hall - Meeting & Workshop Hall", "Meeting & Workshop Hall", 150, 15000.0, "Innovation Hub Centre", "Flexible modular seating workshop studio with smart whiteboards & breakout rooms.", "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=800")
            );
            hallRepository.saveAll(initialHalls);
        }

        // 3. Seed Sample Bookings (all initialized to Pending status)
        if (bookingRepository.count() == 0) {
            List<Booking> initialBookings = List.of(
                new Booking("HB-8842", "hall-1", "Elite Hall - Marriage Hall", "Ananya Roy", "ananya@example.com", "+91 98123 45678", "Marriage Hall", 600, LocalDate.of(2026, 11, 15), LocalDate.of(2026, 11, 16), "09:00 AM", "10:00 PM", 59000.0, "Credit Card"),
                new Booking("HB-8843", "hall-2", "Elite Hall - Baby Shower Hall", "Vikram Malhotra", "vikram@techcorp.com", "+91 98989 12345", "Baby Shower Hall", 150, LocalDate.of(2026, 10, 20), LocalDate.of(2026, 10, 20), "10:00 AM", "04:00 PM", 21240.0, "UPI"),
                new Booking("HB-8844", "hall-3", "Elite Hall - Birthday Party Hall", "Siddharth Rao", "siddharth@gmail.com", "+91 97777 66655", "Birthday Party Hall", 250, LocalDate.of(2026, 12, 5), LocalDate.of(2026, 12, 5), "04:00 PM", "11:00 PM", 25960.0, "Cash on Venue")
            );
            bookingRepository.saveAll(initialBookings);
        }
    }
}
