package com.beson.mapper;

import com.beson.model.Bike;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BikeMapper {

    void insertBatch(List<Bike> bikes);

    @Select("SELECT id, bno,regionid,ST_AsGeoJSON(location) FROM bikes")
    List<Bike> selectAll();
}
