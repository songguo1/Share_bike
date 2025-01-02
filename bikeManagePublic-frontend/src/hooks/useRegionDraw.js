import { useMapStore } from "@/stores/mapStore";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Draw } from "ol/interaction";
import { ref } from "vue";
import { WKT} from "ol/format";
import { Circle} from "ol/geom";
import { fromCircle } from "ol/geom/Polygon";
import { createBox } from "ol/interaction/Draw";

export function useRegionDraw() {
  const mapStore = useMapStore();
  const map = mapStore.map;
  const source = new VectorSource();
  const wktFormat = new WKT();
  const vector = new VectorLayer({
    source: source,
    style: {
      "fill-color": "rgba(255, 255, 255, 0.2)",
      "stroke-color": "#ffcc33",
      "stroke-width": 2,
      "circle-radius": 7,
      "circle-fill-color": "#ffcc33",
    },
  });
  const draw = ref(null);

  const DrawGeometry = (geometry) => {
    if (geometry == "Box") {
      draw.value = new Draw({
        source: source,
        type: "Circle",
        geometryFunction: createBox(),
      });
    } else {
      draw.value = new Draw({
        source: source,
        type: geometry,
      });
    }

    map.addLayer(vector);
    map.addInteraction(draw.value);

    return new Promise((resolve) => {
      draw.value.on("drawend", function (event) {
        map.removeInteraction(draw.value);

        const drawFeature = event.feature;
        let drawGeometry = drawFeature.getGeometry();

        if (drawGeometry instanceof Circle) {
          drawGeometry = fromCircle(drawGeometry);
        }
        const wkt = wktFormat.writeGeometry(drawGeometry,{
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });
        resolve(wkt);
      });
    });
  };

  const deleteDraw = () => {
    map.removeInteraction(draw.value);
    map.removeLayer(vector);
    source.clear();
  };

  

  return {
    DrawGeometry,
    deleteDraw,
  };
}
