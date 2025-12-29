import { defineStore } from "pinia";

export const useBrand = defineStore("brand", {
  state: () => ({
    homeBrands: [],
  }),

  getters: {},

  actions: {
    async getHomeBrandsFromServer() {
      try {
        const { data } = await this.$axios.get("home-brand");
        this.homeBrands = data?.data || [];
      } catch (error) {
        console.error(error);
      }
    },
  },
});
