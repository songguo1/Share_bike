<template>
  <div id="popup" class="ol-popup">
    <a
      href="#"
      id="popup-closer"
      class="ol-popup-closer"
      @click="closePopup"
    ></a>
    <div id="popup-content"></div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/*弹出框样式*/
.ol-popup {
  position: absolute;
  bottom: 12px;
  left: -50px;
  background-color: white;
  box-shadow: rgb(247, 247, 241);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  min-width: 280px;
}

.ol-popup:after {
  position: absolute;
  top: 100%;
  height: 0px;
  width: 0px;
  left: 48px;
  content: "";
  margin-left: -11px;
  border-width: 11px;
  border: 1px solid transparent;
}

.ol-popup:after {
  border-top-color: white;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: "⨉";
}
</style>
