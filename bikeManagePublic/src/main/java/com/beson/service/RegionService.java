package com.beson.service;

import com.beson.DTO.RegionPageQueryDTO;
import com.beson.mapper.RegionMapper;
import com.beson.model.Bike;
import com.beson.model.Region;
import com.beson.result.PageResult;
import com.beson.utils.WKBConverter;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.locationtech.jts.geom.*;
import org.locationtech.jts.io.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RegionService {
    @Autowired
    private RegionMapper regionMapper;
    @Autowired
    private BikeService bikeService;

    public PageResult pageQuery(RegionPageQueryDTO regionPageQueryDTO) {
        PageHelper.startPage(regionPageQueryDTO.getPage(), regionPageQueryDTO.getPageSize());

        List<Region> regions = regionMapper.pageQuery(regionPageQueryDTO);

        PageInfo<Region> pageInfo = new PageInfo<>(regions);

        return PageResult.builder()
                .total(pageInfo.getTotal())
                .records(pageInfo.getList())
                .build();
    }

    public Region getRegionByNo( String rno) {
        return regionMapper.selectByNo(rno);
    }

    public void createRegionWithBikes(Region region) {
        region.setRno(generateUniqueRno());
        regionMapper.insertRegion(region);

        Region savedRegion = regionMapper.selectByNo(region.getRno());
        List<Bike> bikes = null;
        try {
            bikes = generateRandomBikes(savedRegion);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        bikeService.createBikes(bikes);
    }

    public String generateUniqueRno() {
        return UUID.randomUUID().toString();
    }

    public List<Bike> generateRandomBikes(Region region) throws ParseException {
        List<Bike> bikes = new ArrayList<>();
        Geometry regionGeometry = WKBConverter.wkbStringToGeometry(region.getGeometry());
        // 获取区域的边界框
        Envelope envelope = regionGeometry.getEnvelopeInternal();
        double minX = envelope.getMinX();
        double maxX = envelope.getMaxX();
        double minY = envelope.getMinY();
        double maxY = envelope.getMaxY();

        for (int i = 0; i < region.getExist(); i++) {
            Bike bike = null;
            String location = generateRandomPointInRegion(regionGeometry, minX, maxX, minY, maxY);
            bike = Bike.builder()
                        .bno(generateUniqueRno())
                        .regionid(region.getId())
                        .location(location)
                        .build();

            bikes.add(bike);
        }
        return bikes;
    }

    private String generateRandomPointInRegion(Geometry regionGeometry, double minX, double maxX, double minY, double maxY) {
        Point randomPoint = null;
        while (randomPoint == null || !regionGeometry.contains(randomPoint)) {
            double randomX = minX + (Math.random() * (maxX - minX));
            double randomY = minY + (Math.random() * (maxY - minY));
            randomPoint = new GeometryFactory().createPoint(new Coordinate(randomX, randomY));
        }
        return randomPoint.toString();
    }
}
