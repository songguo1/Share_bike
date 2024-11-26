<template>
  <div class="home">
    <OlMap />
    <MapControl @visible="containerVisible = $event" />
    <DrawButton v-if="mapStore.currentDrawType" />
    <Container v-if="containerVisible" @visible="containerVisible = $event" />
  </div>
</template>

<script setup>
import OlMap from "@/components/OlMap.vue";
import MapControl from "@/components/MapControl.vue";
import DrawButton from "@/components/DrawButton.vue";
import Container from "@/components/Container.vue";
import { ref } from "vue";

import { useMapStore } from "@/stores/mapStore";

const containerVisible = ref(false);
const mapStore = useMapStore();
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
}
</style>
