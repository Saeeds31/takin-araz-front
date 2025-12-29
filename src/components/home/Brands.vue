<template>
  <section v-for="(brand, index) in homeBrands" :key="brand.title">
    <div class="grid grid-cols-[2fr_3fr] gap-8  items-center w-[70%] mx-auto mt-6 "
      :dir="index % 2 == 0 ? 'rtl' : 'ltr'">
      <img class="w-full" :src="baseFileUrl(brand.image)" :alt="brand.title">
      <div class="w-full flex flex-col  gap-2" :class="index % 2 == 0 ? 'items-start' : 'items-end'">
        <h2 class="font-bold">
          {{ brand.title }}
        </h2>
        <div class="whitespace-normal leading-8 text-justify " dir="rtl">
          {{ brand.description }}
        </div>
      </div>
    </div>
    <carSlides :title="brand.title" :list="brand.cars" v-if="brand.cars && brand.cars.length" />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useBrand } from '@/stores/modules/brand';
import carSlides from '@/components/home/carSlider.vue';
const store = useBrand();
const homeBrands = computed(() => store.homeBrands);
function baseFileUrl(image) {
  return import.meta.env.VITE_BASE_RESOURCE_URL + image
}
store.getHomeBrandsFromServer();

</script>

<style scoped></style>
