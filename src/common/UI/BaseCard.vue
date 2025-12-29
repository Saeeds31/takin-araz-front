<template>
    <div 
        class="px-4 py-4 rounded-lg border" 
        :class="[
            classes,
            disabled ? 'opacity-50 cursor-not-allowed hover:none' : ''
        ]"
    >
        <slot></slot>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: 'filled',
        validator: (v) => ['filled', 'outlined'].includes(v)
    },
    mode: {
        type: String,
        default: 'default',
        validator: (v) => ['default', 'primary', 'success'].includes(v)
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const classes = computed(() => {
    const colors = {
        filled: {
            default: 'border-[#00000040] bg-[#f9f9f9]',
            primary: 'border-primary bg-primary-light',
            success: 'border-emerald-600 bg-emerald-50',
            danger: 'border-red-600 bg-red-50'
        },
        outlined: {
            default: 'border-[#00000040]',
            primary: 'border-primary',
            success: 'border-emerald-600',
            danger: 'border-red-600'
        }
    }

    return colors[props.variant][props.mode]
});
</script>

<style scoped></style>