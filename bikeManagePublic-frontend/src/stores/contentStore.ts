import { defineStore } from 'pinia'

export const useContentStore = defineStore('context', {
  state: () => ({
    isRegionTableVisible: false
  }),
  actions: {
    toggleRegionTable(value: boolean) {
      this.isRegionTableVisible = value
    }
  }
})