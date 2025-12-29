import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useMessage = defineStore("message", {
  state: () => ({
    loading: false,
    supervisors: [],
    messages: [],
  }),

  getters: {
    getMessages: (state) => state.messages,
  },

  actions: {
    async load() {
      this.loading = true;
      try {
        const { data } = await this.$axios.get("messages");
        this.messages = data.data || [];
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async supervisor() {
      this.loading = true;
      try {
        const { data } = await this.$axios.get("supervisor-role");
        this.supervisors = data?.data || [];
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async send(fd) {
      this.loading = true;
      try {
        const { data } = await this.$axios.post("message", fd);
        const { message, data: response } = data || {};

        toast.success(message || "پیغام ذخیره شد");

        if (response && Array.isArray(this.messages)) {
          this.messages.push(response);
        }
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
