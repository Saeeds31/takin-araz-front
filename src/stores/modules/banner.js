import { defineStore } from "pinia";

export const useBanner= defineStore("banner", {
  state: () => ({
    banners: []
  }),


  actions: {
    async getBannersFromServer() {
        try {

            const { data } = await this.$axios.get('banners');
            this.banners = data?.data || [];
            
        } catch (error) {
            console.error(error);
        }
    }
  },
});
