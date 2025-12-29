import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useProfile = defineStore("profile", {
  state: () => ({
    loading: false,
    user: null,
    identity: null,
    important: null,
    physical: null,
    validity: null,
    register: [],
    settings: {},
  }),

  getters: {
    getLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getIdentity: (state) => state.identity,
    getImportant: (state) => state.important,
    getPhysical: (state) => state.physical,
    getValidity: (state) => state.validity,
    getRegister: (state) => state.register,
    getSettings: (state) => state.settings,
  },

  actions: {
    async fetchProfileInfo() {
      try {
        this.loading = true;

        const { data } = await this.$axios.get("user/profile");
        const { user, message } = data || null;

        // toast.success(message || 'پروفایل کاربر');

        this.user = user || null;

        const { identity_document, important_document, physical, register } = this.user;

        this.identity = identity_document || null;
        this.important = important_document || null;
        this.physical = physical || null;
        this.register = register || [];
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

    async userValidity() {
      try {
        this.loading = true;

        const { data } = await this.$axios.get("user/validity");

        const { message, validity } = data || null;

        this.validity = validity;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

    async fetchSettingsFromServe() {
      try {
        this.loading = true;

        const { data } = await this.$axios.get("settings");
        let settings = {};
        data.forEach((sett) => {
          settings[sett.key] = sett.value;
        });
        this.settings = settings;
      } catch (error) {
        console.error("[settings] Request failed :", error);
      } finally {
        this.loading = false;
      }
    },
    async checkReferral(referralCode) {
      try {
        this.loading = true;

        const fd = new FormData();
        fd.append("referral_code", referralCode);

        const { data } = await this.$axios.post("check-referall", fd);
        console.log(data);

        return data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
