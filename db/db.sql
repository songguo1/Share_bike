-- 启用PostGIS扩展
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 区域表
CREATE TABLE regions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,           -- 区域名称
    rno VARCHAR(50) UNIQUE NOT NULL,      -- 区域编号
    capacity INTEGER NOT NULL,            -- 区域单车容量
    exist INTEGER DEFAULT 0,              -- 当前存量
    geometry GEOMETRY(Polygon, 4326) NOT NULL  -- 地理边界
);

-- 单车表
CREATE TABLE bikes (
    id BIGSERIAL PRIMARY KEY,
    bno VARCHAR(50) UNIQUE NOT NULL,      -- 单车编号
    regionid BIGINT,                      -- 区域ID（逻辑外键）
    location GEOMETRY(Point, 4326) NOT NULL -- 当前位置
);

-- 区域空间索引
CREATE INDEX idx_regions_geometry ON regions USING GIST(geometry);

-- 单车位置索引
CREATE INDEX idx_bikes_location ON bikes USING GIST(location);

-- 单车区域索引
CREATE INDEX idx_bikes_regionid ON bikes(regionid);
