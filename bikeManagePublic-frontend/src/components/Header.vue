<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="logo" />
    </div>
    <div class="navigation">
      <ul>
        <li v-for="item in nav_list">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
const nav_list = [
  { name: "查询投放区域" },
  { name: "增设投放区域" },
  { name: "单车定位查询" },
  { name: "单车热点分析" },
];
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
  background: rgba(8, 10, 18, 0.72);  // 半透明背景
  backdrop-filter: blur(12px);  // 毛玻璃效果
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .logo {
    img {
      height:55px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .navigation {
    margin-left: 40px;
    
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 8px; 
      
      li {
        padding: 8px 16px;
        font-size: 18px;
        color: #ffffff;
        font-weight: 500;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgb(255, 255, 255);
          color: #007AFF;  
        }
        
        &:active {
          background: rgba(75, 75, 75, 0.1);
          transform: scale(0.98);
        }
      }
    }
  }
}
</style>