<template>
    <swiper @swiper="onSwiper" :autoplay="true" :loop="true" :slides-per-view="1" :space-between="20"
        :modules="modules">
        <swiper-slide v-for="(slide, index) in filtered" :key="index">
            <div class="relative">
                <img class="w-full aspect-[4/5] lg:aspect-[2.50/1] rounded-xl" :src="$filters.resource(slide.image)"
                    alt="">
                <div class="absolute start-0  top-4 px-4 pb-4">
                    <div class=" min-h-24 lg:min-h-36 py-4 rounded-xl px-4 flex items-start justify-center flex-col">
                        <h3 class=" mb-3 font-bold">
                            {{ slide?.title }}
                        </h3>
                        <div class=" mb-3" v-html="$sanitize(slide?.description)"></div>
                        <div class="flex items-center gap-4">
                            <button @click="next" class="
                         size-8 rounded-full  bg-neutral-200/80 flex items-center justify-center 
                        base-back hover:text-white transition-colors duration-150
                        ">
                                <IconArrowRight :color="'white'" />
                            </button>

                            <BaseButton @click="gotoLink(slide?.link)" v-if="slide && slide?.button_text"
                                class="hidden lg:flex base-back">
                                {{ slide?.button_text }}
                            </BaseButton>
                            <button @click="prev" class="
                         size-8 rounded-full  bg-neutral-200/80 flex items-center justify-center 
                        base-back hover:text-white transition-colors duration-150
                        ">
                                <IconArrowLeft :color="'white'" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup>
import { useSlider } from '@/stores/modules/slider';
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import BaseButton from '@/common/UI/BaseButton.vue';
import IconArrowLeft from '@/common/icons/IconArrowLeft.vue';
import IconArrowRight from '@/common/icons/IconArrowRight.vue';

const store = useSlider();
const modules = [Autoplay];
const swiperInstance = ref(null);
const isMobile = ref(window.innerWidth <= 768);

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