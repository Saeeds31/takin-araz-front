<template>
    <section id="registerSlider" class="w-[350px]">
        <swiper :slides-per-view="1" :space-between="50" :autoplay="autoplay" @swiper="onSwiper">
            <swiper-slide class="relative"
                v-for="(item, index) in sliders.filter(slide => slide.location == 'login' && slide.type == 'desktop')"
                :key="index">
                <img class="w-full rounded-2xl" :src="baseFileUrl(item.image)" :alt="item.title">
                <div class="sliderContent absolute bottom-0 p-4  right-0 w-[100%] mx-auto">
                    <div v-html="item.description" />
                </div>
            </swiper-slide>
        </swiper>
    </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ref } from "vue"
export default {
    props: {
        sliders: Array
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {

        baseFileUrl(image) {
            return import.meta.env.VITE_BASE_RESOURCE_URL + image
        }
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        let autoplay = {
            delay: 5000,
        }
        return {
            onSwiper,autoplay
        };
    },
};

</script>
<style>
.sliderContent {
    background: #1213;
    backdrop-filter: blur(10px);
    color: white;
    border-radius: 0 0 16px 16px;
}
</style>