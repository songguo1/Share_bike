package com.beson.mapper;

import com.beson.model.Location;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LocationMapper {

    @Select("SELECT * FROM locations")
    List<Location> findAll();

    @Select("SELECT * FROM locations WHERE id = #{id}")
    Location findById(Long id);

    @Insert("INSERT INTO locations (name, type, lon, lat) VALUES (#{name}, #{type}, #{lon}, #{lat})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Location location);

    @Update("UPDATE locations SET name = #{name}, type = #{type}, lon = #{longitude}, lat = #{latitude} WHERE id = #{id}")
    void update(Location location);

    @Delete("DELETE FROM locations WHERE id = #{id}")
    void delete(Long id);
}