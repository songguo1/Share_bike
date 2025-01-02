package com.beson.model;

import lombok.Data;
import org.opengis.geometry.Geometry;

@Data
public class Region {
    private Long id;
    private String name;
    private String rno;
    private Integer capacity;
    private Integer exist;
    private String geometry;
}