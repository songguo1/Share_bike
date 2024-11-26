<template>
  <div class="app">
    <Header></Header>
    <Home></Home>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Home from "./views/Home.vue";
</script>

<style>
.app{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
