<template>
  <div class="home">
    <OlMap />
    <MapControl @visible="containerVisible = $event" />
    <DrawButton v-if="mapStore.currentDrawType" />
    <Container v-if="containerVisible" @visible="containerVisible = $event" />
    <RegionTable v-if="contentStore.isRegionTableVisible"/>
    <RegionDialog v-if="contentStore.isRegionDialogVisible"/>
    <div class="clear-layer" @click="clear" v-if="contentStore.isButtonVisible">
      <el-icon>
        <RefreshRight />
      </el-icon>
      清除图层
    </div>
  </div>
</template>

<script setup>
import OlMap from "@/components/OlMap.vue";
import MapControl from "@/components/MapControl.vue";
import DrawButton from "@/components/DrawButton.vue";
import Container from "@/components/Container.vue";
import RegionTable from "@/components/RegionTable.vue";
import RegionDialog from "@/components/RegionDialog.vue";
import { ref } from "vue";
import { useContentStore } from "@/stores/contentStore";
import { useMapStore } from "@/stores/mapStore";
import { RefreshRight } from "@element-plus/icons-vue";
import { useBikeGeom } from "@/hooks/useBikeGeom";

const containerVisible = ref(false);
const mapStore = useMapStore();
const contentStore = useContentStore();
const { clearLayer } = useBikeGeom();

const clear = () => {
  clearLayer();
  contentStore.toggleButton(false);
};

</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
}
.clear-layer {
  position: absolute;
  top: 10px;
  left: 50%;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #93c8eb;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
