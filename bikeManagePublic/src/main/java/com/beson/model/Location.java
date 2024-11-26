package com.beson.model;

import lombok.Data;

@Data
public class Location {
    private Long id;
    private String name;
    private String type;
    private Double lon;
    private Double lat;
}