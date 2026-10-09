package com.hallbooking.repository;

import com.hallbooking.model.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallRepository extends JpaRepository<Hall, String> {
    List<Hall> findByCategory(String category);
    List<Hall> findByNameContainingIgnoreCase(String keyword);
}
