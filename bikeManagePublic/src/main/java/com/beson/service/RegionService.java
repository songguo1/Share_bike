package com.beson.service;

import com.beson.DTO.RegionPageQueryDTO;
import com.beson.mapper.RegionMapper;
import com.beson.model.Region;
import com.beson.result.PageResult;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RegionService {
    @Autowired
    private RegionMapper regionMapper;

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

    public void createRegion(Region region) {
        region.setRno(generateUniqueRno());
        regionMapper.insertRegion(region);
    }

    public String generateUniqueRno() {
        return UUID.randomUUID().toString();
    }
}
