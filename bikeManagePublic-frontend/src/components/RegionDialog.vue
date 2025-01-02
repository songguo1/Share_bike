<template>
  <div class="dialog-container">
    <div class="region-dialog-header">
      <el-icon class="close-icon" @click="handleClose"><Close /></el-icon>
    </div>
    <div class="region-dialog-content">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="区域类型">
          <el-select
            @change="handleGeometryChange"
            placeholder="请选择区域类型"
          >
            <el-option label="圆形" value="Circle" />
            <el-option label="矩形" value="Box" />
            <el-option label="多边形" value="Polygon" />
          </el-select>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="区域容量">
          <el-input v-model="form.capacity" />
        </el-form-item>
        <el-form-item label="区域存量">
          <el-input v-model="form.exist" />
        </el-form-item>
        <el-button @click="handleConfirm">确定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useContentStore } from "@/stores/contentStore";
import { useRegionDraw } from "@/hooks/useRegionDraw";
import { Close } from "@element-plus/icons-vue";
import axios from "axios";
const contentStore = useContentStore();
const { DrawGeometry,deleteDraw } = useRegionDraw();
const form = ref({
  geometry: "",
  name: "",
  capacity: "",
  exist: "",
});

const addRegion = async () => {
  try {
    console.log(form.value);
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/regions`,form.value);
    console.log(res);
    deleteDraw();
    ElMessage.success("添加区域成功");
    form.value = {
      geometry: "",
      name: "",
      capacity: "",
      exist: "",
    };
  } catch (error) {
    console.error("获取区域数据失败:", error);
    ElMessage.error("获取区域数据失败");
  }
};

const handleConfirm = () => {
  addRegion();
};

const handleClose = () => {
  deleteDraw();
  contentStore.toggleRegionDialog(false);
};

const handleGeometryChange = async (value) => {
  try {
    const wkt = await DrawGeometry(value);
    form.value.geometry = wkt; // 保存 WKT 数据
  } catch (error) {
    console.error('绘制区域失败:', error);
    ElMessage.error('绘制区域失败');
  }
};
</script>

<style lang="scss" scoped>
.dialog-container {
  position: absolute;
  width: 300px;
  height: 270px;
  background-color: #fff;
  top: 100px;
  right: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  .region-dialog-header {
    margin-bottom: 10px;
    text-align: right;
    border-bottom: 1px solid #ebeef5;

    .close-icon {
      cursor: pointer;
      font-size: 20px;
      transition: all 0.3s;

      &:hover {
        color: #409eff;
        transform: rotate(90deg);
      }
    }
  }
}
</style>
