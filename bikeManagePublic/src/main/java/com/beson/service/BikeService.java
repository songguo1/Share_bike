package com.beson.service;

import com.beson.mapper.BikeMapper;
import com.beson.model.Bike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BikeService {
   @Autowired
   private BikeMapper bikeMapper;

   public void createBikes(List<Bike> bikes) {
       bikeMapper.insertBatch(bikes);
   }

   public List<Bike> getAllBikes() {
       return bikeMapper.selectAll();
   }
}
