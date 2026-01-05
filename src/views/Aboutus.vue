<template>
  <div class="grid grid-cols-1 items-center w-[90%] mx-auto">
    <h2 class="font-bold text-2xl">درباره ما</h2>
    <div class="mt-5 mb-5 whitespace-pre-line" v-if="settings">
      {{ settings?.about_us_text_page }}
    </div>
  </div>
  <Aboutus />
</template>

<script setup>
import Aboutus from "@/components/home/Aboutus.vue";
import { useProfile } from '@/stores/modules/profile';
import { computed } from "vue";
import { useHead } from '@vueuse/head'
import aboutImage from '@/assets/images/home/about2.png'
const store = useProfile();
const settings = computed(() => store.getSettings);

useHead({
  title: 'درباره ما | تکین آراز پرگاس',
  meta: [
    {
      name: 'description',
      content: 'شرکت تکین آراز پرگاس فعال در زمینه ثبت‌نام و تحویل خودروهای خارجی در استان مازندران. با تیمی متخصص و فرایند شفاف، خدماتی مطمئن برای مشتریان ارائه می‌دهد.'
    },
    {
      name: 'keywords',
      content: 'درباره تکین آراز پرگاس, شرکت خودرو خارجی, واردات خودرو, تحویل خودرو, مازندران'
    },
    {
      property: 'og:title',
      content: 'درباره ما | تکین آراز پرگاس'
    },
    {
      property: 'og:description',
      content: 'آشنایی با شرکت تکین آراز پرگاس و خدمات ثبت‌نام و تحویل خودروهای خارجی در مازندران.'
    },
    {
      property: 'og:image',
      content: aboutImage
    },
    {
      property: 'og:url',
      content: 'https://car-tap.ir/about-us'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://car-tap.ir/about-us'
    }
  ]
})
</script>

<style scoped></style>
