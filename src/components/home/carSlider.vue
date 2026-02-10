<template>
    <section class="w-[90%] mx-auto my-[64px]">
        <div class="flex items-center justify-between">
            <h2 class="flex  gap-2">
                <span>محصولات برند</span>
                <span class="font-bold">
                    {{ title }}
                </span>
            </h2>
            <div class="flex items-center gap-4">
                <button @click="next" class="
         size-8 rounded-full  bg-neutral-200/80 flex items-center justify-center 
        base-back hover:text-white transition-colors duration-150
        ">
                    <IconArrowRight :color="'white'" />
                </button>
                <button @click="prev" class="
         size-8 rounded-full  bg-neutral-200/80 flex items-center justify-center 
        base-back hover:text-white transition-colors duration-150
        ">
                    <IconArrowLeft :color="'white'" />
                </button>
            </div>
        </div>
        <swiper class="my-4" @swiper="onSwiper" :autoplay="false" :loop="true" :slides-per-view="4" :space-between="20"
            :modules="modules" :breakpoints="{
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }">
            <swiper-slide v-for="(car, index) in list" :key="index">
                <carCard :car="car" />
            </swiper-slide>
        </swiper>

    </section>
</template>

<script setup>
import { useSlider } from '@/stores/modules/slider';
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import carCard from '@/components/shared/carCard.vue';

import BaseButton from '@/common/UI/BaseButton.vue';
import IconArrowLeft from '@/common/icons/IconArrowLeft.vue';
import IconArrowRight from '@/common/icons/IconArrowRight.vue';

const store = useSlider();
const modules = [Autoplay];
const swiperInstance = ref(null);
const isMobile = ref(window.innerWidth <= 768);
const props = defineProps({
    title: String,
    list: Array,
});
onMounted(() => {
    store.getSliderFromServer();

    window.addEventListener('resize', update);
});
function gotoLink(link) {
    if (!link) return;
    window.open(link, '_self');
}
const onSwiper = (instance) => {
    swiperInstance.value = instance;
}

const next = () => {
    swiperInstance.value.slideNext();
}
const prev = () => {
    swiperInstance.value.slidePrev();
}

const slides = computed(() => {
    return store.getSliders;
});

const update = () => {
    isMobile.value = window.innerWidth <= 768;
}

const filtered = computed(() => {
    return slides.value.filter(slide =>
        slide.location === 'home' && (isMobile.value ? slide.type === 'mobile' : slide.type === 'desktop')
    );
})

onUnmounted(() => {
    window.removeEventListener('resize', update);
})

</script>

<style scoped>
.swiper-button-prev,
.swiper-button-next {
    display: none !important;
}
</style>