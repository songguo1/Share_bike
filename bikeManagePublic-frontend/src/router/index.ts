import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
  //路由初始指向
    path: '/',
    name: 'main',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
