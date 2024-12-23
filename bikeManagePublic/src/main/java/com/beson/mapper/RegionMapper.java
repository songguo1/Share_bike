package com.beson.mapper;

import com.beson.DTO.RegionPageQueryDTO;
import com.beson.model.Region;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RegionMapper {
    /**
     * 分页查询区域
     * @return
     */
    @Select("SELECT * FROM regions ORDER BY id")
    List<Region> pageQuery(RegionPageQueryDTO regionPageQueryDTO);

    /**
     * 根据编号查询区域
     * @param rno
     * @return
     */
    @Select("select * from regions where rno = #{rno}")
    Region selectByNo(String rno);

    /**
     * 新增区域
     * @param region
     */
    @Insert("insert into regions(name, rno, capacity, exist, geometry) values(#{name}, #{rno}, #{capacity}, #{exist}, ST_GeomFromText(#{geometry}, 4326))")
    void insertRegion(Region region);
}
