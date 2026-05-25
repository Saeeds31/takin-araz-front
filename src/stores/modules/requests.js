import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useRequest = defineStore("request", {
  state: () => ({
    loading: false,
    requests: [],
    request: null,
  }),

  getters: {
    getRequests: (state) => state.requests,
    getRequest: (state) => state.request,
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

    async loadItem(id) {
      this.loading = true;
      try {
        const { data } = await this.$axios.get("car-request/" + id);
        this.request = data.request || [];
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
