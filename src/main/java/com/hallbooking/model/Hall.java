package com.hallbooking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "halls")
public class Hall {

    @Id
    private String id; // e.g. "hall-1", "hall-2"

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g. "Marriage Hall", "Baby Shower Hall"...

    private Integer capacity;
    private Double pricePerDay;
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String imagesJson; // JSON array of gallery image URLs

    @Column(columnDefinition = "TEXT")
    private String amenitiesJson; // JSON array of amenities

    private Double rating;
    private Integer reviewsCount;
    private Integer areaSqFt;
    private Integer parkingCapacity;
    private String stageDimensions;

    public Hall() {}

    public Hall(String id, String name, String category, Integer capacity, Double pricePerDay, String location, String description, String image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.capacity = capacity;
        this.pricePerDay = pricePerDay;
        this.location = location;
        this.description = description;
        this.image = image;
        this.rating = 4.8;
        this.reviewsCount = 45;
        this.areaSqFt = 5500;
        this.parkingCapacity = 150;
        this.stageDimensions = "30ft x 15ft";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getImagesJson() { return imagesJson; }
    public void setImagesJson(String imagesJson) { this.imagesJson = imagesJson; }

    public String getAmenitiesJson() { return amenitiesJson; }
    public void setAmenitiesJson(String amenitiesJson) { this.amenitiesJson = amenitiesJson; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(Integer reviewsCount) { this.reviewsCount = reviewsCount; }

    public Integer getAreaSqFt() { return areaSqFt; }
    public void setAreaSqFt(Integer areaSqFt) { this.areaSqFt = areaSqFt; }

    public Integer getParkingCapacity() { return parkingCapacity; }
    public void setParkingCapacity(Integer parkingCapacity) { this.parkingCapacity = parkingCapacity; }

    public String getStageDimensions() { return stageDimensions; }
    public void setStageDimensions(String stageDimensions) { this.stageDimensions = stageDimensions; }
}
