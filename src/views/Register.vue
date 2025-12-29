<template>
    <BaseStepper />
    <RouterView></RouterView>
</template>

<script setup>
import BaseStepper from '@/common/UI/BaseStepper.vue';
import { useRegister } from '@/stores/modules/register';
import { computed } from 'vue';

const store = useRegister();

const loading = computed(() => store.loading);
</script>