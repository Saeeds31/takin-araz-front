import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useRequest = defineStore("request", {
  state: () => ({
    loading: false,
    requests: [],
  }),

  getters: {
    getRequests: (state) => state.requests,
  },

  actions: {
    async load() {
      this.loading = true;
      try {
        const { data } = await this.$axios.get("car-requests");
        this.requests = data.requests || [];
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
