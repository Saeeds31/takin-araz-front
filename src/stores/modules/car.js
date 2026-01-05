import { defineStore } from "pinia";

export const useCar = defineStore("car", {
  state: () => ({
    car: null,
  }),

  getters: {},

  actions: {
    async getCarDetailFromServer(id) {
      try {
        const { data } = await this.$axios.get(`/cars/${id}`);
        this.car = data.data;
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
});
