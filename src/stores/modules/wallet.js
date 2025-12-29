import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useWallet = defineStore("wallet", {
  state: () => ({
    wallet: null,
    transactions: [],
    loading: false,
  }),

  getters: {
    getBalance: (state) => state?.wallet?.balance || 0,
    getLoading: (state) => state.loading,
    getTransactions: (state) => state.transactions
  },

  actions: {
    async walletDetail() {
        try {
            this.loading = true;

            const { data } = await this.$axios.get('user/wallet');

            const { message, wallet, transactions } = data || { message: '', wallet: null, transactions: [] };

            this.transactions = transactions;
            this.wallet = wallet;

            toast.success(message);
            
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    },
    async increaseWalletAmount(amount) {
      try {
        this.loading = true;
        const { data } = await this.$axios.post('user/wallet/increase', { amount });
        
        this.wallet = data?.wallet || null;
        
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
});
