import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoading = defineStore('loading', () => {
    const actives = ref(0);

    const loading = computed(() => actives.value > 0);

    const start = () => {
        actives.value++;
    }

    const stop = () => {
        if (actives.value <= 0) return;

        actives.value--;
    }

    return { loading, stop, start };
});