<template>
    <TheHeader v-if="settings"   />
    <RouterView></RouterView>
    <TheFooter v-if="settings" />
    <BigLoader v-if="!settings" />
</template>

<script setup>
import TheFooter from '@/components/home/TheFooter.vue';
import TheHeader from '@/components/home/TheHeader.vue';
import BigLoader from '@/components/shared/bigLoader.vue';
import { useProfile } from '@/stores/modules/profile';
import { computed } from 'vue';
const store = useProfile();
const settings = computed(() => store.getSettings);

</script>

<style scoped></style>