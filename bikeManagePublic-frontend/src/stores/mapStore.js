import { defineStore } from "pinia";

export const useMapStore = defineStore("map", {
  state: () => ({
    map: null,
    currentDrawType: null,
    vectorSource: null,
  }),
  actions: {
    setDrawType(type) {
      this.currentDrawType = type;
    },
    setVectorSource(source) {
      this.vectorSource = source;
    },
    clearDraw() {
      if (this.vectorSource) {
        this.vectorSource.clear();
      }
    },
  },
});
