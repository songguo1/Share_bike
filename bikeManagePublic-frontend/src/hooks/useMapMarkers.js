import { ref } from "vue";
import axios from "axios";
import { transform } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Style, Icon, Text, Fill, Stroke } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import markerIcon from "@/assets/img/marker.png";
import { useMarkerStore } from "@/stores/markerStore.js";
import { useMapStore } from "@/stores/mapStore.js";
import { ElMessage } from "element-plus";
import add_markerIcon from "@/assets/img/add_marker.png";
export function useMapMarkers() {
  const markerStore = useMarkerStore();
  const mapStore = useMapStore();
  // 标记图层
  const markerLayer = ref(null);

  // 初始化标记图层
  const initMarkerLayer = () => {
    if (!mapStore.map) {
      console.error("Map is not initialized");
      return;
    }

    // 初始化标记图层
    const vectorSource = new VectorSource();
    markerLayer.value = new VectorLayer({
      source: vectorSource,
    });

    mapStore.map.addLayer(markerLayer.value);
  };

  // 获取标记点数据
  const fetchMarkers = async () => {
    // 清除之前的图层
    if (markerLayer.value) {
      mapStore.map.removeLayer(markerLayer.value);
    }

    initMarkerLayer();
    try {
      const response = await axios.get("http://localhost:8080/locations");
      markerStore.markers = response.data;
      renderMarkers();
    } catch (err) {
      ElMessage.error("获取标记点数据失败：" + err.message);
    }
  };

  // 渲染标记点
  const renderMarkers = () => {
    if (!markerLayer.value) return;

    // 清空标记图层
    const source = markerLayer.value.getSource();
    source.clear();

    // 渲染标记点
    markerStore.markers.forEach((marker) => {
      const coordinate = transform(
        [parseFloat(marker.lon), parseFloat(marker.lat)],
        "EPSG:4326",
        "EPSG:3857"
      );

      const feature = new Feature({
        geometry: new Point(coordinate),
        properties: marker,
      });

      // 设置标记点样式，包含图标和文本
      feature.setStyle(
        new Style({
          image: new Icon({
            width: 30,
            src: markerIcon,
            anchor: [0.5, 1],
          }),
          text: new Text({
            text: marker.name || "", // 显示地点名称
            offsetY: 15, // 文本垂直偏移量
            fill: new Fill({
              color: "#2D3436", // 深色文本
            }),
            font: "bold 14px sans-serif", // 加粗字体
            stroke: new Stroke({  // 添加文字描边
              color: '#FFFFFF',
              width: 3
            }),
            padding: [5, 5, 5, 5],  // 文本内边距
            textBaseline: 'bottom',
            textAlign: 'center'
          }),
        })
      );

      source.addFeature(feature);
    });
  };

  // 删除标记点
  const removeMarker = async (markerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/locations/${markerId}`
      );
      if (response.status === 200) {
        // 从 store 中移除该标记点
        markerStore.markers = markerStore.markers.filter(
          (marker) => marker.id !== markerId
        );
        // 更新图层
        if (markerLayer.value) {
          mapStore.map.removeLayer(markerLayer.value);
        }
        await fetchMarkers();
        return response;
      }
    } catch (error) {
      throw error;
    }
  };
  //点击事件
  const clickEvent = (evt) => {
    const coordinate = evt.coordinate;

    // 创建新的要素
    const feature = new Feature({
      geometry: new Point(coordinate),
    });

    // 设置要素样式
    feature.setStyle(
      new Style({
        image: new Icon({
          width: 30,
          src: add_markerIcon,
          anchor: [0.5, 1],
        }),
        text: new Text({
          text: markerStore.newMarker.name || "", // 显示地点名称
          offsetY: 15, // 文本垂直偏移量
          fill: new Fill({
            color: "#2D3436",
          }),
          font: "bold 14px sans-serif",
          stroke: new Stroke({
            color: '#FFFFFF',
            width: 3
          }),
          padding: [5, 5, 5, 5],
          textBaseline: 'bottom',
          textAlign: 'center'
        }),
      })
    );

    // 添加到标记图层
    const source = markerLayer.value.getSource();
    source.addFeature(feature);

    markerStore.setMarkerCoordinate(coordinate[0], coordinate[1]);
    markerStore.addMarker();
  };

  // 添加新标记点的方法
  const addMarkers = () => {
    initMarkerLayer();
    if (!mapStore.map) {
      console.error("Map is not initialized");
      return;
    }
    mapStore.map.on("click", clickEvent);
  };

  // 添加保存标记点的方法
  const PostMarker = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/locations",
        markerStore.newMarkers
      );
      if (response.status === 200) {
        ElMessage.success("标记点添加成功");
        markerStore.newMarkers = [];
        // 清除临时标记图层并重新获取所有标记点
        if (markerLayer.value) {
          mapStore.map.removeLayer(markerLayer.value);
        }
        await fetchMarkers();
      }
    } catch (error) {
      ElMessage.error("添加标记点失败：" + error.message);
    }
  };

  // 获取标记点信息
  const getMarkerInfo = (feature) => {
    if (!feature) return null;
    return feature.get("properties");
  };

  //取消点击事件
  const cancelClick = () => {
    mapStore.map.un("click", clickEvent);
  };

  return {
    initMarkerLayer,
    fetchMarkers,
    PostMarker,
    addMarkers,
    removeMarker,
    getMarkerInfo,
    cancelClick,
  };
}
