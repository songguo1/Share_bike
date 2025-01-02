package com.beson.controller;

import com.beson.DTO.RegionPageQueryDTO;
import com.beson.model.Region;
import com.beson.result.PageResult;
import com.beson.result.Result;
import com.beson.service.RegionService;
import org.locationtech.jts.io.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/regions")
public class RegionController {
    @Autowired
    private RegionService regionService;

    @GetMapping
    public Result<PageResult> listRegions(RegionPageQueryDTO regionPageQueryDTO) {
        PageResult pageResult=regionService.pageQuery(regionPageQueryDTO);
        return Result.success(pageResult);
    }

    @GetMapping("/{rno}")
    public Result<Region> getRegionById(@PathVariable String rno) {
        return Result.success(regionService.getRegionByNo(rno));
    }

    @PostMapping
    public Result createRegion(@RequestBody Region region)  {
        regionService.createRegionWithBikes(region);
        return Result.success();
    }
}
