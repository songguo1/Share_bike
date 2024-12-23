package com.beson.model;

import lombok.Data;

@Data
public class Region {
    private Long id;
    private String name;
    private String rno;
    private Integer capacity;
    private Integer exist;
    private String geometry; // WKT格式
}