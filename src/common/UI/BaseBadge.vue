<template>
    <div class="inline-block w-fit bg px-7 py-2 rounded-2xl text-sm" :class="[classes]">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    mode: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'success', 'danger', 'warn'].includes(v)
    }
});

const classes = computed(() => {
    const colors = {
        primary: 'text-primary bg-primary-light',
        warn: 'text-yellow-600 bg-yellow-50',
        success: 'text-emerald-600 bg-emerald-50',
        danger: 'text-red-600 bg-red-50',
    };

    return colors[props.mode];
});
</script>

<style scoped></style>