<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="logo" />
    </div>
    <div class="navigation">
      <ul>
        <li
          v-for="item in nav_list"
          :key="item.name"
          @click="handleNavClick(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useContentStore } from "@/stores/contentStore";
import { useBikeGeom } from "@/hooks/useBikeGeom";

const { addBikeGeomLayer, toggleBikeHeatMap, clearLayer } = useBikeGeom();
const contentStore = useContentStore();

const nav_list = [
  { id: 1, name: "查询投放区域" },
  { id: 2, name: "增设投放区域" },
  { id: 3, name: "单车定位查询" },
  { id: 4, name: "单车热点分析" },
];

const handleNavClick = (id) => {
  if (id === 1) {
    contentStore.toggleRegionTable(true);
  }
  if (id === 2) {
    contentStore.toggleRegionDialog(true);
  }
  if (id === 3) {
    contentStore.toggleButton(true);
    addBikeGeomLayer();
  }
  if (id === 4) {
    contentStore.toggleButton(true);
    toggleBikeHeatMap();
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
  background: rgba(8, 10, 18, 0.72); // 半透明背景
  backdrop-filter: blur(12px); // 毛玻璃效果
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .logo {
    img {
      height: 55px;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .navigation {
    margin-left: 40px;

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 8px;

      li {
        padding: 8px 16px;
        font-size: 18px;
        color: #ffffff;
        font-weight: 500;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: rgb(255, 255, 255);
          color: #007aff;
        }

        &:active {
          background: rgba(75, 75, 75, 0.1);
          transform: scale(0.98);
        }
      }
    }
  }
}
</style>
