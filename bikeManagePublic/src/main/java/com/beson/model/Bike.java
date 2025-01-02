package com.beson.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

@Data
@Builder
public class Bike {
    private Long id;
    private String bno;
    private Long regionid;
    private String location;
}