<template>
  <div class="container">
    <div class="input">
      <el-input
        style="width: 300px"
        v-model="nameValue"
        placeholder="请输入地点标注名称"
        @change="markerStore.setMarkerName(nameValue)"
      />
    </div>
    <div class="input">
      <el-input
        style="width: 300px"
        v-model="typeValue"
        placeholder="请输入地点类型"
        @change="markerStore.setMarkerType(typeValue)"
      />
    </div>
    <div>
      <el-button-group>
        <el-button style="width: 100px" type="primary" @click="handleSave"
          >保 存</el-button
        >
        <el-button style="width: 100px" type="primary" @click="handleRefresh">
          刷 新
        </el-button>
        <el-button style="width: 100px" type="primary" @click="handleExit">
          退 出
        </el-button>
      </el-button-group>
    </div>

    <div class="table">
      <el-table :data="tableData" class="table-data">
        <el-table-column label="Id" width="50">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span>{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Type" width="80">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #reference>
                <el-tag>{{ scope.row.type }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="150">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleLocate(scope.$index, scope.row)"
            >
              定位
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";
const nameValue = ref("");
const typeValue = ref("");
import { useMarkerStore } from "@/stores/markerStore.js";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { ElMessage } from "element-plus";

const markerStore = useMarkerStore();
const mapMarkers = useMapMarkers();

interface PointLabel {
  id: string;
  name: string;
  type: string;
}

const handleLocate = (index: number, row: PointLabel) => {
  console.log(index, row);
};
const handleDelete = async (index: number, row: PointLabel) => {
  try {
    await mapMarkers.removeMarker(row.id);
    await mapMarkers.fetchMarkers();
    tableData.value = markerStore.markers;
    ElMessage.success("删除成功");
  } catch (error) {
    ElMessage.error("删除失败");
  }
};

const tableData = ref<PointLabel[]>([]);

onMounted(() => {
  mapMarkers.addMarkers();
  tableData.value = markerStore.markers;
});
//保存操作
const handleSave = async () => {
  try {
    await mapMarkers.PostMarker();
    await mapMarkers.fetchMarkers();
    tableData.value = markerStore.markers;
    ElMessage.success("保存成功");
  } catch (error) {
    ElMessage.error("保存失败");
  }
};
//刷新操作
const handleRefresh = async () => {
  try {
    await mapMarkers.fetchMarkers();
    tableData.value = markerStore.markers;
    ElMessage.success("刷新成功");
  } catch (error) {
    ElMessage.error("刷新失败");
  }
};
//退出操作
const emit = defineEmits(["visible"]);
const handleExit = () => {
  mapMarkers.cancelClick();
  emit("visible", false);
  console.log("触发退出");
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  bottom: 150px;
  right: 20px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  .table {
    width: 100%;
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
