<template>
    <div class="flex flex-col md:flex-row items-center justify-center gap-2">
        <span class="text-neutral-600 text-xs text-nowrap">{{ $filters.date(Date.now(), 'year') }} - {{ gregorian
            }}</span>
        <span class="text-neutral-600 hidden md:block ">•</span>
        <p class="text-neutral-600 text-xs text-nowrap">تمامی حقوق وب سایت برای شرکت تکین آرتا پرگاس محفوظ است.</p>
        <a href="https://padhosha.ir" target="_blank" class="text-neutral-600 text-xs text-nowrap">
            طراحی و پیاده سازی توسط تیم <b>پدهوشا</b>
        </a>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue'

const gregorian = computed(() => new Date().getFullYear());


</script>

<style scoped></style>