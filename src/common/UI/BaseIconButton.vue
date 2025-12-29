<template>
    <template v-if="to">
        <RouterLink 
            :to="to"
            class="flex items-center justify-center rounded-lg cursor-pointer"
            :class="[
                isHover ? 'hover:bg-neutral-100 active:bg-neutral-200 transition-colors duration-150' : 'bg-neutral-400',
                finalSize
            ]"
        >
            <slot></slot>
        </RouterLink>
    </template>
    <template v-else>
        <button 
            type="button"
            class="flex items-center justify-center rounded-lg cursor-pointer"
            :class="[
                isHover ? 'hover:bg-neutral-100 active:bg-neutral-200 transition-colors duration-150' : 'bg-neutral-400',
                finalSize
            ]"
            :disabled="disabled"
        >
            <slot></slot>
        </button>
    </template>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    isHover: {
        type: Boolean,
        default: false,
    },
    to: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false,
        default: 'base',
        validator: (s) => ['sm', 'base', 'lg'].includes(s)
    }
});

const finalSize = computed(() => {
    const sizes = { sm: 'size-9', base: 'size-11', lg: 'size-14' };
    return sizes[props.size];
});
</script>

<style scoped></style>