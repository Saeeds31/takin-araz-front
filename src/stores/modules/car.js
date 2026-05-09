import { defineStore } from "pinia";

export const useCar = defineStore("car", {
  state: () => ({
    car: null,
    cars: null,
    brand: null,
    category: null,
    filters: null,
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
    async getCarsFilterFromServer() {
      try {
        const { data } = await this.$axios.get(`/filters`);

        this.filters = data.data;
      } catch (error) {
        throw error;
      }
    },
    async getCarsFromServer(query) {
      try {
        const { data } = await this.$axios.get(`/cars`, {
          params: {
            ...query,
          },
        });
        this.cars = data.data;
        this.brand = data.brand;
        this.category = data.category;
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
});
