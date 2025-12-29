// import { onErrorHandler } from "@/common/utils/helpers";
import router from "@/router";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useRegister = defineStore("register", {
  state: () => ({
    loading: false,
  }),

  getters: {
    getLoading: (state) => state.loading,
  },

  actions: {
    async submitIdentityInfo(values) {
      try {
        this.loading = true;
        const fd = new FormData();
        for (const key in values) {
          fd.append(key, values[key] != null ? (typeof values[key] == "object" && key != "image" ? values[key].id : values[key]) : "");
        }
        const { data } = await this.$axios.post("user/profile/edit", fd);
        const { message } = data || {};
        toast.success(message);
        return true;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async submitPhysicalInfo(values) {
      try {
        this.loading = true;

        const fd = new FormData();
        for (const key in values) {
          fd.append(key, values[key]);
        }

        const { data } = await this.$axios.post("register/3/step", fd);
        const { message } = data || {};

        toast.success(message);

        return true;
      } catch (error) {
        // onErrorHandler(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async submitEducationDocs(values) {
      try {
        this.loading = true;

        const fd = new FormData();
        for (const key in values) {
          fd.append(key, values[key]);
        }

        const { data } = await this.$axios.post("register/4/step", fd);
        const { message } = data || {};

        toast.success(message);
        return true;
      } catch (error) {
        // onErrorHandler(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async submitIdentityDocs(values) {
      try {
        this.loading = true;

        const fd = new FormData();
        for (const key in values) {
          fd.append(key, values[key]);
        }

        const { data } = await this.$axios.post("register/2/step", fd);
        const { message } = data || {};

        toast.success(message);

        return true;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
