<template>
  <div id="map"></div>
  <PopupMenu />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Map, View } from "ol";
import PopupMenu from "./PopupMenu.vue";
import Nanjing from "@/assets/data/nanjing.json";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Draw } from "ol/interaction";
import { Fill, Stroke, Style, Circle, Icon } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { transform } from "ol/proj";
import { Tile } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { useMapStore } from "@/stores/mapStore";
import Overlay from "ol/Overlay";
import { useMapMarkers } from "@/hooks/useMapMarkers";


const draw = ref(null);

// 矢量图层
const vectorSource = ref(new VectorSource());
// 天地图token
const token = "219d900abe817a196c0af21d6cec754b";
// 地图store
const mapStore = useMapStore();
// 弹出框
const popup = ref(null);

const mapMarkers = useMapMarkers();

onMounted(() => {
  initMap();
  addPopup();
  mapMarkers.fetchMarkers();
});

// 南京图层
const NanjingLayer = ref(null);

// 绘制矢量图层
const Drawvector = new VectorLayer({
  source: vectorSource.value,
  style: new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.5)",
    }),
    stroke: new Stroke({
      color: "#ffcc33",
      width: 2,
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "#ffcc33",
      }),
    }),
  }),
});

// 初始化地图
const initMap = () => {
  const view = new View({
    center: transform([118.65, 32.09], "EPSG:4326", "EPSG:3857"),
    zoom: 10,
  });

  // 创建天地图矢量底图和标签图层
  var layerTianDi = new Tile({
    source: new XYZ({
      url: getLayerUrlByData("street", 4326, token),
      projection: "EPSG:4326",
      wrapX: true,
      crossOrigin: "anonymous",
    }),
  });

  var layerTianDiLabel = new Tile({
    source: new XYZ({
      url: getLayerUrlByData("street_label", 4326, token),
      projection: "EPSG:4326",
      wrapX: true,
      crossOrigin: "anonymous",
    }),
  });

  // 创建地图实例
  mapStore.map = new Map({
    target: "map",
    layers: [layerTianDi, layerTianDiLabel, Drawvector],
    view,
  });

  //添加矢量图层
  NanjingLayer.value = new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(Nanjing, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    }),
  });

  mapStore.map.addLayer(NanjingLayer.value);
  
};

// 根据图层类型生成相应的URL
function getLayerUrlByData(type, wkid, token) {
  let url = "http://t{1-7}.tianditu.com/DataServer?";
  let layerId;

  switch (type) {
    case "image":
      layerId = "img_";
      break;
    case "label":
      layerId = "cia_";
      break;
    case "street":
      layerId = "vec_";
      break;
    case "street_label":
      layerId = "cva_";
      break;
    default:
      throw new Error("Unsupported layer type");
  }

  const tileMatrixSetId = wkid === 4326 ? "c" : "w";
  return `${url}T=${layerId}${tileMatrixSetId}&x={x}&y={y}&l={z}&tk=${token}`;
}

// 添加绘制交互
const addDrawInteraction = (drawType) => {
  if (draw.value) {
    mapStore.map.removeInteraction(draw.value);
  }

  let geometryType;
  switch (drawType) {
    case "drawPoint":
      geometryType = "Point";
      break;
    case "drawLine":
      geometryType = "LineString";
      break;
    case "drawPolygon":
      geometryType = "Polygon";
      break;
    default:
      return;
  }

  draw.value = new Draw({
    source: vectorSource.value,
    type: geometryType,
  });

  mapStore.map.addInteraction(draw.value);

};

// 修改 watch 函数
watch(
  () => mapStore.currentDrawType,
  (newType) => {
    addDrawInteraction(newType);
  }
);


// 添加高亮样式
const highlightStyle = new Style({
  stroke: new Stroke({
    color: "red",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(255,0,0,0.1)",
  }),
});

// 在 addPopup 函数中修改点击事件处理
const addPopup = () => {
  const container = document.getElementById("popup");
  const content = document.getElementById("popup-content");
  const closer = document.getElementById("popup-closer");

  closer.onclick = () => {
    popup.value.setPosition(undefined);
  };

  popup.value = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  mapStore.map.addOverlay(popup.value);

  let highlightedFeature = null;

  mapStore.map.on("click", (evt) => {
    const feature = mapStore.map.forEachFeatureAtPixel(
      evt.pixel,
      (feature, layer) => {
        // 检查是否是南京图层
        if (layer === NanjingLayer.value && !draw.value) {
          return feature;
        }
      }
    );

    // 重置之前高亮的要素样式
    if (highlightedFeature) {
      highlightedFeature.setStyle(undefined);
      highlightedFeature = null;
    }

    if (feature) {
      const coordinates = evt.coordinate;
      feature.setStyle(highlightStyle);
      highlightedFeature = feature;

      content.innerHTML = `
        <h3>南京市</h3>
        <p>这里是南京市，江苏省会，简称"宁"。</p>
        <p>面积：6587平方公里</p>
        <p>人口：约850万</p>
      `;
      popup.value.setPosition(coordinates);
    } else {
      popup.value.setPosition(undefined);
    }
  });
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
