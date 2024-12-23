<template>
  <div class="region-table" @mousedown="startDrag">
    <div class="region-table-header">
      <el-icon class="close-icon" @click="handleClose"><Close /></el-icon>
    </div>
    <div>
      <el-table :data="tableData" style="width: 600px" height="250">
        <el-table-column label="Id" width="50">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="rno" label="编号" :show-overflow-tooltip="true" width="100"/>
        <el-table-column prop="name" label="名称" width="90" />
        <el-table-column prop="capacity" label="容量" width="90" />
        <el-table-column prop="exist" label="存量" width="90" />
        <el-table-column label="警告等级" width="80">
          <template #default="scope">
            <el-tag
              type="success"
              v-if="scope.row.capacity / scope.row.exist > 0.6"
              >正常</el-tag
            >
            <el-tag
              type="warning"
              v-if="scope.row.capacity / scope.row.exist <= 0.6"
              >警告</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" @click="handleLocation(scope.row.rno)"
              >定位</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15]"
        :background="true"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";
import { useContentStore } from "@/stores/contentStore.ts";
import { ref, onMounted } from "vue";
import { useRegionGeometry } from '@/hooks/useRegionGeom';
import axios from "axios";

const contentStore = useContentStore();
const { loadRegionGeometry, locateRegion } = useRegionGeometry();

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

// 获取区域数据
const fetchRegions = async (page, pageSize) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/regions?page=${page}&pageSize=${pageSize}`
    );
    const data = response.data.data;
    tableData.value = data.records;
    total.value = data.total;
    
    await loadRegionGeometry(data.records);
  } catch (error) {
    console.error("获取区域数据失败:", error);
  }
};

// 页码改变时的处理函数
const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchRegions(val, pageSize.value);
};

// 每页条数改变时的处理函数
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchRegions(currentPage.value, val);
};

const handleClose = () => {
  contentStore.toggleRegionTable(false);
};

// 组件挂载时获取数据
onMounted(() => {
  fetchRegions(currentPage.value, pageSize.value);
});

// 拖动逻辑
const startDrag = (e) => {
  const target = e.currentTarget;
  const startX = e.clientX - target.offsetLeft;
  const startY = e.clientY - target.offsetTop;

  const onMove = (moveEvent) => {
    target.style.cursor = 'grab';

    const newX = moveEvent.clientX - startX;
    const newY = moveEvent.clientY - startY;
    target.style.left = `${newX}px`;
    target.style.top = `${newY}px`;
  };

  const onEnd = () => {
    target.style.cursor = 'default';

    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
};

// 根据rno获取区域数据
const fetchRegionByRno = async (rno) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/regions/${rno}`
  );
  const data = response.data.data;
  return data.geometry;
};

// 修改定位功能
const handleLocation = async (rno) => {
    try {
        const geometry = await fetchRegionByRno(rno);
        await locateRegion(geometry);
    } catch (error) {
        console.error("定位区域失败:", error);
    }
};

</script>

<style lang="scss" scoped>
.region-table {
  height: 300px;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.region-table-header {
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
</style>
