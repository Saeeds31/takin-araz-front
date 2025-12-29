import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useReceipt = defineStore("receipt", {
  state: () => ({
    loading: false,
    receipts: [],
  }),

  getters: {
    getReceipts: (state) => state.receipts,
  },

  actions: {
    async load() {
      this.loading = true;
      try {
        const { data } = await this.$axios.get("receipts");
        this.receipts = data.data || [];
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async send(fd) {
      this.loading = true;
      try {
        const { data } = await this.$axios.post("receipts", fd);
        const { message, data: response } = data || {};

        toast.success(message || "رسید دریافت شد");
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
