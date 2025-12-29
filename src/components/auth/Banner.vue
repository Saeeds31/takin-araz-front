<template>
    <div class="h-full overflow-hidden rounded-2xl">
        <img :src="banner" alt="Banner" class="h-full object-cover">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import image from '@/assets/images/placeholder-image.png';

const banner = ref(image)
</script>

<style scoped></style>