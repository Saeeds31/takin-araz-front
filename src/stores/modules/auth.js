import Cookies from "js-cookie";
import router from "@/router";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useAuth = defineStore("auth", {
  state: () => ({
    loading: false,
    mobile: null,
  }),

  getters: {
    getLoading: (state) => state.loading,
    getMobile: (state) => state.mobile,
  },

  actions: {
    async check(mobile) {
      this.loading = true;
      
      try {
        this.mobile = mobile;
        const { data } = await this.$axios.post("check-mobile", { mobile });

        return data;
        
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async resend() {
      try {
        if (!this.mobile) {
          await router.push({ name: "Check" });
          toast.error("شماره موبایل یافت نشد، مجددا تلاش کنید");
          return;
        }

        this.loading = true;

        const mobile = this.mobile;
        const { data } = await this.$axios.post("send-otp", { mobile });

        return data;

      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async verify(token) {
      this.loading = true;
      try {
        const fd = new FormData();
        fd.append("mobile", this.mobile);
        fd.append("token", token);

        const { data } = await this.$axios.post("verify-otp", fd);
        Cookies.set("token", data.token);

        return true;

      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      Cookies.remove('token');
    }
  },
});
