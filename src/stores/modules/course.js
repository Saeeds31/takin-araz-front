import { useErrors } from "@/composables/useError";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

const { displayError } = useErrors();

export const useCourse = defineStore("course", {
  state: () => ({
    loading: false,
    courses: [],
    purchases: [],
    course: null,
    purchase: null,
    exam_result: [],
  }),

  getters: {},

  actions: {
    async fetchCoursesFromServer() {
      try {
        const { data } = await this.$axios.get("courses");
        this.courses = data?.data || [];
      } catch (error) {
        displayError(error);
      }
    },

    async fetchPurchasedFromServer() {
      try {
        const { data } = await this.$axios.get("purchased-courses");

        this.purchases = data?.data || [];
      } catch (error) {
        displayError(error);
      }
    },

    async fetchCourseFromServer(id) {
      try {
        const { data } = await this.$axios.get("courses/" + id);

        this.course = data?.course || null;
        this.purchase = data?.purchase || null;
        this.exam_result = data?.exam_result || null;
      } catch (error) {
        displayError(error);
      }
    },
    async orderCourse(fd) {
      try {
        this.loading = true;

        const { data } = await this.$axios.post("course-order", fd);
        return data;
      } catch (error) {
        displayError(error);
      } finally {
        this.loading = false;
      }
    },
    async paymentInstallments(fd) {
      try {
        this.loading = true;

        const { data } = await this.$axios.post("course-order-installments", fd);
        return data;
      } catch (error) {
        displayError(error);
      } finally {
        this.loading = false;
      }
    },

    async allowed(id) {
      this.loading = true;
      try {
        const { data } = await this.$axios.get(`course-exam/${id}/retest`);
        return data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
