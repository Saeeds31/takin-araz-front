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
const store = useProfile();
const settings = computed(() => store.getSettings);

</script>

<style scoped></style>
