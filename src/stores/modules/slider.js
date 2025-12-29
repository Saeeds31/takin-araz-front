import { defineStore } from "pinia";

export const useSlider = defineStore("slider", {
  state: () => ({
    sliders: [],
  }),

  getters: {
    getSliders: (state) => state.sliders,
  },

  actions: {
    async getSliderFromServer() {
      try {
        const { data } = await this.$axios.get("sliders");
        this.sliders = data.data;
        
      } catch (error) {
        throw error;
      }
    },
  },
});
