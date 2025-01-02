package com.beson.controller;

import com.beson.model.Bike;
import com.beson.result.Result;
import com.beson.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bikes")
public class BikeController {

    @Autowired
    private BikeService bikeService;

    @GetMapping
    public Result<List<Bike>> getAllBikes() {
        return Result.success(bikeService.getAllBikes());
    }

}
