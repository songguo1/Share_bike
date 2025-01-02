import { defineStore } from 'pinia'

export const useContentStore = defineStore('context', {
  state: () => ({
    isRegionTableVisible: false,
    isRegionDialogVisible: false,
    isButtonVisible: false
  }),
  actions: {
    toggleRegionTable(value: boolean) {
      this.isRegionTableVisible = value
    },
    toggleRegionDialog(value: boolean) {
      this.isRegionDialogVisible = value;
    },
    toggleButton(value: boolean) {
      this.isButtonVisible = value;
    }
  }
})