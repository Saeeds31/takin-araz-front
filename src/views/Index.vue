<template>
    <TheHeader />
    <RouterView></RouterView>
    <TheFooter/>
</template>

<script setup>
import TheFooter from '@/components/home/TheFooter.vue';
import TheHeader from '@/components/home/TheHeader.vue';
import { ref } from 'vue'

</script>

<style scoped></style>