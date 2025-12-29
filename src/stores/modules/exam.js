import { defineStore } from "pinia";

export const useExam = defineStore("exam", {
  state: () => ({
    loading: false,
    questions: [],
  }),

  getters: {
    getQuestions: (state) => state.questions,
  },

  actions: {
    async save(id, fd) {
      this.loading = true;
      try {
        const { data } = await this.$axios.post(`course-exam/${id}/save`, fd);
        return data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async load(id) {
      this.loading = true;
      try {
        const { data } = await this.$axios.get(`course/${id}/exam`);
        this.questions = data?.data || [];
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
  },
});
