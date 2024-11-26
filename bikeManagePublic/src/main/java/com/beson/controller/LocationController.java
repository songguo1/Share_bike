package com.beson.controller;

import com.beson.model.Location;
import com.beson.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        Location location = locationService.getLocationById(id);
        return location != null ? ResponseEntity.ok(location) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> createLocation(@RequestBody Location[] locations) {
        for (Location location : locations) {
            locationService.createLocation(location);
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateLocation(@PathVariable Long id, @RequestBody Location locationDetails) {
        Location location = locationService.getLocationById(id);
        if (location != null) {
            location.setName(locationDetails.getName());
            location.setType(locationDetails.getType());
            location.setLon(locationDetails.getLon());
            location.setLat(locationDetails.getLat());
            locationService.updateLocation(location);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}