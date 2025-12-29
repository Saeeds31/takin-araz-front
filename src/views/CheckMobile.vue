<template>
    <div class="h-full flex gap-8">
        <div class="w-1/2 grow">
            <CheckMobile />
        </div>
        <div v-if="sliders" class="w-1/2 grow hidden lg:block">
            <img src="@/assets/images/login.png" class="w-[60%] " alt="">
        </div>
    </div>
</template>

<script setup>
import CheckMobile from '@/components/auth/CheckMobile.vue';
import { useSlider } from '@/stores/modules/slider';
import { onMounted, computed } from 'vue';
const store = useSlider();
onMounted(() => {
    store.getSliderFromServer();
})
const sliders = computed(() => {
    return store.getSliders;
})
</script>

<style scoped></style>