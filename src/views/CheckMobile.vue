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
import { useHead } from '@vueuse/head';
useHead({
    title: 'ثبت‌نام کاربر | تکین آراز پرگاس',
    meta: [
        {
            name: 'description',
            content: 'ثبت‌نام کاربران در سامانه تکین آراز پرگاس برای دسترسی به خدمات ثبت‌نام و تحویل خودروهای خارجی در استان مازندران.'
        }
        ,
        {
            name: 'keywords',
            content: 'ثبت نام کاربر, تکین آراز پرگاس, سامانه خودرو خارجی, واردات خودرو, تحویل خودرو, مازندران'
        },
        { property: 'og:title', content: 'ثبت‌نام کاربر | تکین آراز پرگاس' },
        {
            property: 'og:description',
            content: 'با ثبت‌نام در سامانه تکین آراز پرگاس، به خدمات ثبت‌نام و تحویل خودروهای خارجی دسترسی پیدا کنید.'
        },
        { property: 'og:image', content: 'https://tap-car.ir/logo.png' },

        { property: 'og:url', content: 'https://tap-car.ir/check-mobile' }
    ],
    link: [
        { rel: 'canonical', href: 'https://tap-car.ir/check-mobile' }
    ]
})
const store = useSlider();
onMounted(() => {
    store.getSliderFromServer();
})
const sliders = computed(() => {
    return store.getSliders;
})
</script>

<style scoped></style>