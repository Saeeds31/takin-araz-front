<template>
    <div class="h-full flex gap-8">
        <div class="w-1/2 grow">
            <VerifyCode />
        </div>
        <div v-if="sliders" class="w-1/2 grow hidden lg:block">
            <img src="@/assets/images/login.png" class="w-[60%] " alt="">
        </div>
    </div>
</template>

<script setup>
import VerifyCode from '@/components/auth/VerifyCode.vue';
import { useAuth } from '@/stores/modules/auth';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSlider } from '@/stores/modules/slider';
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
        { property: 'og:image', content: 'https://car-tap.ir/logo.png' },

        { property: 'og:url', content: 'https://car-tap.ir/check-mobile' }
    ],
    link: [
        { rel: 'canonical', href: 'https://car-tap.ir/check-mobile' }
    ]
})
const router = useRouter();
const store = useAuth();
const store1 = useSlider();

const mobile = computed(() => store.mobile);
const sliders = computed(() => {
    return store1.getSliders;
})
onMounted(() => {
    if (!mobile.value) {
        router.push({ name: 'Check' });
    }
})

</script>

<style scoped></style>