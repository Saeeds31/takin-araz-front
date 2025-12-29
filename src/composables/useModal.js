import { computed, ref } from "vue"

let show = ref(false);

export function useModal() {

    const toggle = () => {
        show.value = !show.value;
    }

    const open = () => {        
        show.value = true;
    }

    const close = () => {
        show.value = false;
    }

    const opened = computed(() => show.value);

    return { opened, toggle, open, close };
}