package com.beson.service;

import com.beson.mapper.LocationMapper;
import com.beson.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationMapper locationMapper;

    public List<Location> getAllLocations() {
        return locationMapper.findAll();
    }

    public Location getLocationById(Long id) {
        return locationMapper.findById(id);
    }

    public void createLocation(Location location) {
        locationMapper.insert(location);
    }

    public void updateLocation(Location location) {
        locationMapper.update(location);
    }

    public void deleteLocation(Long id) {
        locationMapper.delete(id);
    }
}