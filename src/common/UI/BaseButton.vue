<template>
    <label 
        v-if="connect" 
        :for="connect" 
        :disabled="disabled"
        :class="[
            classes,
            disabled ? 'opacity-50 cursor-not-allowed hover:none' : 'cursor-pointer',
            'px-4 py-3 text-sm select-none md:text-md'
        ]"
    >
        <slot></slot>
    </label>

    <RouterLink
        v-else-if="to" 
        :to="to" 
        :disabled="disabled"
        :class="[
            classes,
            disabled ? 'opacity-50 cursor-not-allowed hover:none' : 'cursor-pointer',
            'px-4 py-3 text-sm select-none md:text-md'
        ]"
    >
        <slot></slot>
    </RouterLink>

    <button
        v-else
        :type="type"
        :disabled="disabled"
        :class="[
            classes,
            disabled ? 'opacity-50 cursor-not-allowed hover:none' : 'cursor-pointer',
            'px-6 py-3 text-sm select-none md:text-md'
        ]"
    >
        <slot></slot>
    </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router';

const props = defineProps({
    variant: {
        type: String,
        default: 'filled',
        validator: (v) => ['filled', 'outlined'].includes(v)
    },
    state: {
        type: String,
        default: 'default',
        validator: (s) => ['default', 'success', 'error', 'warn'].includes(s)
    },
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    connect: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    }
});

const classes = computed(() => {
    const base = 'flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-200 rtl:flex-row-reverse';

    const colors = {
        filled: {
            default: 'bg-primary hover:bg-primary-hover text-white',
            success: 'bg-green-600 hover:bg-green-700 text-white',
            error: 'bg-red-600 hover:bg-red-700 text-white',
            warn: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        },
        outlined: {
            default: 'border border-primary text-primary hover:bg-primary-light-hover',
            success: 'border border-green-600 text-green-600 hover:bg-green-50',
            error: 'border border-red-600 text-red-600 hover:bg-red-50',
            warn: 'border border-yellow-500 text-yellow-600 hover:bg-yellow-50',
        }
    }

    return `${ base } ${ colors[props.variant][props.state] }`;
});

</script>

<style scoped></style>