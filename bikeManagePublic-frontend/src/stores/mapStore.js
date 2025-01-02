import { defineStore } from "pinia";
import { Vector as VectorSource } from "ol/source";

export const useMapStore = defineStore("map", {
  state: () => ({
    map: null,
    currentDrawType: null,
    vectorSource: new VectorSource(),
    bikeGeomLayer: null,
  }),
  actions: {
    setDrawType(type) {
      this.currentDrawType = type;
    },
    setVectorSource(source) {
      this.vectorSource = source;
    },
    setBikeGeomLayer(layer) {
      this.bikeGeomLayer = layer;
    },
    clearDraw() {
      if (this.vectorSource) {
        this.vectorSource.clear();
      }
    },
  },
});
