<template>
    <span class="text-xs border w-fit px-2 rounded-md" :class="[classes]">{{ label }}</span>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    status: {
        type: Object,
        required: true
    }
});



const classes = computed(() => {
    const colors = {
        pending: 'text-yellow-600 bg-yellow-50',
        rejected: 'text-red-600 bg-red-50',
        accepted: 'text-emerald-700 bg-emerald-50',
    }

    return props.status in colors ? colors[props.status] : 'text-gray-700 bg-gray-50';
});

const label = computed(() => {
    const labels = {
        pending: 'در انتظار تایید',
        rejected: 'رد شده',
        accepted: 'تکمیل شده',
    }

    return props.status in labels ? labels[props.status] : 'تکمیل نشده';
});
</script>

<style scoped></style>