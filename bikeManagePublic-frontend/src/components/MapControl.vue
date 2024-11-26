<template>
  <el-menu
    class="map-control-menu"
    mode="horizontal"
    :ellipsis="false"
    :popper-offset="12"
    @select="handleSelect"
  >
    <!-- 定位菜单 -->
    <el-sub-menu index="Draw">
      <template #title>
        <el-icon><EditPen /></el-icon>
        <span>绘制</span>
      </template>
      <el-menu-item
        v-for="item in menuItems.Draw"
        :key="item.id"
        :index="`Draw-${item.id}`"
        @click="handleDrawItemClick(item.id)"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>

    <!-- 图层菜单 -->
    <el-sub-menu index="layers">
      <template #title>
        <el-icon><MapLocation /></el-icon>
        <span>图层</span>
      </template>
      <el-menu-item
        v-for="item in menuItems.layers"
        :key="item.id"
        :index="`layers-${item.id}`"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>

    <!-- 工具菜单 -->
    <el-sub-menu index="tools">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>工具</span>
      </template>
      <el-menu-item
        v-for="item in menuItems.tools"
        :key="item.id"
        :index="`tools-${item.id}`"
        @click="handleTool(item.id)"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { EditPen, MapLocation, Tools } from "@element-plus/icons-vue";
import { useMapStore } from "@/stores/mapStore";
import { useMapMarkers } from '@/hooks/useMapMarkers'

const mapStore = useMapStore();

// 定义默认菜单项
const menuItems = {
  Draw: [
    { id: "drawPoint", name: "绘制点" },
    { id: "drawLine", name: "绘制线" },
    { id: "drawPolygon", name: "绘制面" },
  ],
  layers: [
    { id: "satellite", name: "影像图" },
    { id: "street", name: "街道图" },
    { id: "terrain", name: "地形图" },
  ],
  tools: [{ id: "pointLabel", name: "地点标注" }],
};

//绘制菜单栏点击事件
const handleDrawItemClick = (id) => {
  mapStore.setDrawType(id);
};

const emit = defineEmits(["visible"]);


const handleTool = (id) => {
  if (id === "pointLabel") {
    emit("visible", true);
  }

};
</script>

<style lang="scss" scoped>
.map-control-menu {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  padding: 4px;
  overflow: visible;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
