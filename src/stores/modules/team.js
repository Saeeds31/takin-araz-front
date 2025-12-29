import { defineStore } from "pinia";

export const useTeam= defineStore("team", {
  state: () => ({
    team: []
  }),


  actions: {
    async getTeamFromServer() {
        try {

            const { data } = await this.$axios.get('teams');
            this.team = data?.data || [];
            
        } catch (error) {
            console.error(error);
        }
    }
  },
});
