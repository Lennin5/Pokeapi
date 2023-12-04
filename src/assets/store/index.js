import { defineStore } from "pinia"


export const useRootStore = defineStore("app", {
  state: () => ({
    navigationDrawerColor: "orange",
  }),

  getters: {
    getNavigationDrawerColor() {
      return this.navigationDrawerColor;
    },
  },

  actions: {
    updateNavigationDrawerColor(newColor) {
      this.navigationDrawerColor = newColor;
    },
  },
});
