<template>
  <section v-for="(brand, index) in homeBrands" :key="brand.title">
    <div class="w-full px-[5%] py-12" :dir="index % 2 == 0 ? 'rtl' : 'ltr'">
      <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-center relative w-full max-w-6xl mx-auto p-8 lg:p-12 rounded-xl
               bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl border border-neutral-700/50">

        <!-- Image Section -->
        <div class="relative overflow-hidden rounded-lg shadow-lg"
          :class="index % 2 == 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-1'">
          <img class="w-full h-72 lg:h-96 object-cover transition duration-500 ease-in-out transform hover:scale-105"
            v-lazy="baseFileUrl(brand.image)" :alt="brand.title">
          <!-- Overlay for subtle effect -->
          <div class="absolute inset-0 bg-black/20 hover:bg-black/30 transition duration-500"></div>
        </div>

        <!-- Content Section -->
        <div class="w-full flex flex-col gap-4"
          :class="index % 2 == 0 ? 'order-1 lg:order-2 items-start' : 'order-1 lg:order-2 items-end'">

          <h2
            class="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-500">
            {{ brand.title }}
          </h2>

          <div class="whitespace-normal text-lg leading-8 text-gray-300 text-justify"
            :dir="index % 2 == 0 ? 'rtl' : 'ltr'">
            {{ brand.description }}
          </div>

          <!-- Call to Action Button -->
          <router-link :to="`/cars?brand_id=${brand.id}`"
            class="group relative inline-flex items-center justify-center px-6 py-3 rounded-full
                   font-semibold text-sm tracking-wide transition duration-500
                   bg-yellow-400 text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900">
            <span>مشاهده محصولات</span>
            <span class="absolute right-0 flex items-center pr-4 transition-transform duration-500 ease-in-inout"
              :class="index % 2 == 0 ? 'translate-x-full group-hover:translate-x-0' : '-translate-x-full group-hover:translate-x-0'">

            </span>
            <!-- Subtle glow effect -->
            <span
              class="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </router-link>
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

<style scoped>
/* Custom styles if needed */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
}

.border-neutral-700\/50 {
  border-color: rgba(55, 65, 81, 0.5);
  /* dark:border-neutral-700 */
}

/* Ensure the gradient background on the card works well */
.bg-gradient-to-br from-gray-800 via-gray-900 to-black {
  background-image: linear-gradient(to bottom right, #374151, #111827, #000000);
  /* Example mapping */
}

/* Focus ring offset for dark backgrounds */
.focus\:ring-offset-gray-900 {
  --tw-ring-offset-color: #111827;
}

/* Ensure the RTL/LTR text alignment is respected */
[dir="rtl"] .text-justify {
  text-align: right;
}

[dir="ltr"] .text-justify {
  text-align: left;
}

/* Image hover effect - subtle zoom */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Button text animation */
.group-hover\:translate-x-0 {
  transform: translateX(0);
}

.translate-x-full {
  transform: translateX(100%);
}

.-translate-x-full {
  transform: translateX(-100%);
}

/* For the placeholder icon */
.w-6.h-6 {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
