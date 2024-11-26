/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  declare module '@/stores/markerStore.js' // declare module 'xxx'路径或者模块名
  declare module '@/hooks/useMapMarkers' // declare module 'xxx'路径或者模块名
