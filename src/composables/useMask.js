import { computed, ref } from "vue";

export function useMask() {
    const mobile = ref('');

    const setMobile = (value) => {
        mobile.value = value;
    }

    const masked = computed(() => {
        if (!mobile.value) return '';

        const num = mobile.value.toString().trim();

        if (!/^\d{11}$/.test(num)) return '';

        const first = num.slice(0, 4);
        const last = num.slice(-2);
        const middle = '-'.repeat(num.length - 6);

        return `${last}${middle}${first}`
    });

    return { mobile, masked, setMobile };
}