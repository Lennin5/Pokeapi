import { defineStore } from "pinia"


export const useRootStore = defineStore("app", {
  state: () => ({
    navigationDrawerColor: "red",
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
