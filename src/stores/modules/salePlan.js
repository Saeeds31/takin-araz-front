import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const router = useRouter();
export const useSalePlan = defineStore("salePlan", {
  state: () => ({
    salePlan: null,
  }),

  getters: {},

  actions: {
    async getSaleDetailFromServer(id) {
      try {
        const { data } = await this.$axios.get(`/sales-plan/${id}`);
        this.salePlan = data.salePlan;
        if (!this.salePlan) {
          toast.error("طرح مد نظر شما پیدا نشد");
          setTimeout(() => {
            router.push("/home");
          }, 5000);
        }
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
});
