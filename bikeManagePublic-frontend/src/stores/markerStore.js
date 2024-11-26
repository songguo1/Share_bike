import { defineStore } from "pinia";
import { transform } from 'ol/proj';

export const useMarkerStore = defineStore("marker", {
  state: () => ({
    // 新增的标记点
    newMarkers: [],
    // 新增的单个标记点
    newMarker: {
      name: "",
      lon: "",
      lat: "",
      type: ""
    },
    // 标记点数据
    markers: [],
  }),
  actions: {
    addMarker() {
      // 创建新标记点对象的副本
      const markerCopy = {
        name: this.newMarker.name,
        lon: this.newMarker.lon,
        lat: this.newMarker.lat,
        type: this.newMarker.type
      };
      this.newMarkers.push(markerCopy);
    },
    setMarkerName(name) {
      this.newMarker.name = name;
    },
    setMarkerType(type) {
      this.newMarker.type = type;
    },
    setMarkerCoordinate(lon, lat) {
      const [transformedLon, transformedLat] = transform(
        [lon, lat],
        'EPSG:3857',
        'EPSG:4326'
      )
      this.newMarker.lon = transformedLon
      this.newMarker.lat = transformedLat
    },

  },
});
