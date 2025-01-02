import { ref } from "vue";
import { Point } from "ol/geom";
import axios from "axios";
import { useMapStore } from "@/stores/mapStore.js";
import bikeIcon from "@/assets/img/bike.png";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Icon, Style } from "ol/style";
import { Heatmap as HeatmapLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";

export function useBikeGeom() {
  const bikeGeom = ref([]);

  const mapStore = useMapStore();
  const map = mapStore.map;
  const bikeGeomSource = ref(null);
  const bikeGeomFeature = ref([]);
  const bikeGeomLayer = mapStore.bikeGeomLayer;

  const fetchBikeGeom = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bikes`);
      bikeGeom.value = res.data.data.map((item) => {
        // 将字符串解析为 JSON 对象
        const locationObj = JSON.parse(item.location);
        const coordinates = locationObj.coordinates;
        const transformedCoords = fromLonLat(coordinates);
        return new Point(transformedCoords);
      });

    } catch (error) {
      console.error("获取单车数据失败:", error);
      throw error;
    }
  };

  const loadBikeGeom = async () => {
    await fetchBikeGeom();
    bikeGeomFeature.value = bikeGeom.value.map((item) => {
      return new Feature({
        geometry: item,
      });
    });

    bikeGeomSource.value = new VectorSource({
      features: bikeGeomFeature.value,
    });

    mapStore.setBikeGeomLayer(
      new VectorLayer({
        source: bikeGeomSource.value,
        style: new Style({
          image: new Icon({
            src: bikeIcon,
            scale: 0.05,
          }),
        }),
      })
    );
  };

  const addBikeGeomLayer = async () => {
    await loadBikeGeom();
    mapStore.map.addLayer(mapStore.bikeGeomLayer);
  };

  const toggleBikeHeatMap = async () => {
    await loadBikeGeom();
    // 移除现有图层（如果存在）
    if (mapStore.bikeGeomLayer) {
      mapStore.map.removeLayer(mapStore.bikeGeomLayer);
    }
    mapStore.setBikeGeomLayer(
      new HeatmapLayer({
        source: bikeGeomSource.value,
        blur: 10,
        radius: 20,
      })
    );
    mapStore.map.addLayer(mapStore.bikeGeomLayer);
  };

  //清除图层
  const clearLayer = () => {
    if (mapStore.bikeGeomLayer) {
      mapStore.map.removeLayer(mapStore.bikeGeomLayer);
    }
  };

  return {
    toggleBikeHeatMap,
    addBikeGeomLayer,
    clearLayer,
  };
}
