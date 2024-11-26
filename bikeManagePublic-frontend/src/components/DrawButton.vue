<template>
  <div class="draw-button">
    <el-button type="primary" @click="stopDraw">结束绘制</el-button>
    <el-button type="warning" @click="clearDraw">清空绘制</el-button>
  </div>
</template>

<script setup>
import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();

const stopDraw = () => {
  mapStore.setDrawType(null);
  ElMessage.success("已结束绘制");
};

const clearDraw = () => {
  mapStore.clearDraw();
  ElMessage.success("已清空绘制");
};
</script>

<style scoped>
.draw-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  gap: 10px;
}
</style>
