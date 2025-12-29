<template>
    <!-- Backdrop--mobile -->
    <div class="absolute z-20 w-full h-full inset-0 bg-black/10 rounded-lg lg:hidden" :class="{ 'hidden': expanded || false }" @click="emit('expanded')"></div>

    <div class="absolute overflow-y-auto z-20 top-0 bottom-0 start-0 w-72 h-full rounded-lg bg-primary-light px-4 py-4 transition-transform duration-300" :class="{ 'translate-x-full': expanded || false }">
        <SideMenu />
    </div>
</template>

<script setup>
import SideMenu from './SideMenu.vue';

defineProps(['expanded']);
const emit = defineEmits(['expanded']);

</script>

<style scoped></style>