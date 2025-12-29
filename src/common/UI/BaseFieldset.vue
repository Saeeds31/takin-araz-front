<template>
    <div :class="[ classes, disabled ? 'opacity-60 pointer-events-none' : '' ]">
        <div v-if="legend" :class="label">{{ legend }}</div>
        <div class="space-y-2">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    legend: {
        type: String,
        required: false,
        default: ''
    },
    state: {
        type: String,
        default: 'default',
        validator: (s) => ['default', 'success', 'error', 'warn'].includes(s),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const classes = computed(() => {
    const base = 'border rounded-lg px-4 py-3 relative rtl:text-right transition-colors duration-200';

    const colors = {
        default: 'border-gray-300',
        success: 'border-green-500',
        error: 'border-red-500',
        warn: 'border-yellow-400',
    };

    return `${ base } ${ colors[props.state] }`;
});

const label = computed(() => {
    const base = 'absolute -top-3 right-4 px-2 text-sm font-medium font-family-semi-bold';

    const colors = {
        default: 'text-gray-700 bg-white',
        success: 'text-green-700 bg-white',
        error: 'text-red-700 bg-white',
        warn: 'text-yellow-600 bg-white',
    };

    return `${ base } ${ colors[props.state] }`;
});
</script>

<style scoped></style>