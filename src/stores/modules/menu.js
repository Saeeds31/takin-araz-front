import { defineStore } from "pinia";

export const useMenu = defineStore("menu", {
  state: () => ({
    menus: []
  }),

  getters: {},

  actions: {
    async getMenuFromServer() {
        try {

            const { data } = await this.$axios.get('menus');
            this.menus = data?.data || [];
            
        } catch (error) {
            console.error(error);
        }
    }
  },
});
