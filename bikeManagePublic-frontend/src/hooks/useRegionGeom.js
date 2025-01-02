import { ref } from "vue";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke } from "ol/style";
import { Feature } from "ol";
import WKB from "ol/format/WKB";
import { useMapStore } from "@/stores/mapStore";
import { getCenter } from "ol/extent";

export function useRegionGeometry() {
  const mapStore = useMapStore();
  const regionGeoJson = ref([]);
  const highlightLayer = ref(null);

  const loadRegionGeometry = async (records) => {
    try {

      regionGeoJson.value = records.map((item) => {
        let geomWKB = new WKB().readGeometry(item.geometry, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });
        return new Feature({
          geometry: geomWKB,
          name: item.name,
        });
      });

      const layer = new VectorLayer({
        source: new VectorSource({
          features: regionGeoJson.value,
        }),
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 0, 0, 0.2)",
          }),
          stroke: new Stroke({
            color: "#333",
            width: 2,
          }),
        }),
      });
      mapStore.map.addLayer(layer);
    } catch (error) {
      console.error("加载地理数据失败:", error);
    }
  };

  // 定位并高亮显示区域
  async function locateRegion(geometry) {
    if (highlightLayer.value) {
      mapStore.map.removeLayer(highlightLayer.value);
    }

    let polygonGeometry = new WKB().readGeometry(geometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });

    console.log(polygonGeometry);

    let polygonFeature = new Feature({
      geometry: polygonGeometry,
    });

    let geo = polygonFeature.getGeometry();

    let center = getCenter(geo.getExtent());
    // 同时创建一个矢量图层高亮显示
    let vectorSource = new VectorSource({
      features: [polygonFeature],
    });

    highlightLayer.value = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.3)", // 半透明红色填充
        }),
        stroke: new Stroke({
          color: "red",
          width: 2,
        }),
      }),
    });

    // 添加高亮图层
    mapStore.map.addLayer(highlightLayer.value);

    mapStore.map.getView().animate({
      center: center,
      zoom: 10,
      duration: 1000,
    });
  }
  
  return {
    loadRegionGeometry,
    locateRegion,
  };
}
