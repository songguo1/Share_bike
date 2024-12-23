package com.beson.DTO;

import lombok.Data;

@Data
public class RegionPageQueryDTO {
    //页码
    private int page;

    //每页显示记录数
    private int pageSize;
}
