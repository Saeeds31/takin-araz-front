<template>
    <div class="flex flex-col items-center gap-4 mt-4">
        <img class="w-1/3" src="/src/assets/images/empty.svg" alt="Empty">
        <p class="text-md text-neutral-800 font-family-semi-bold word-tracking-wide">متاسفانه، {{ label }} یافت نشد</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    label: {
        type: String,
        required: false,
        default: 'موردی'
    }
})

</script>

<style scoped></style>