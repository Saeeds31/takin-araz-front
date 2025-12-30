<template>
  <div class="grid lg:grid-cols-[2fr_3fr] grid-cols-1 items-center w-[90%] mx-auto" v-if="settings">
    <div class="flex flex-col items-start gap-2">
      <h2 class="font-bold">پیش فروش تکین آراز </h2>
      <h3 class="font-bold text-black">
        {{ settings?.about_home }}
      </h3>
      <p class="whitespace-pre leading-6">
        {{ settings?.about_text }}
      </p>
      <div class="flex items-center gap-2">
        <BaseButton to="#" class=" base-back">
          خرید خودرو
        </BaseButton>
        <BaseButton to="#" class=" base-back-border bg-transparent base-color">
          اطلاعیه ها
        </BaseButton>
      </div>

    </div>
    <div class="flex items-center gap-2">
      <img class="w-[50%]" src="@/assets/images/home/about2.png" alt="">
      <img class="w-[50%]" src="@/assets/images/home/about1.png" alt="">
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/common/UI/BaseButton.vue';
import { computed, onMounted, ref } from "vue";
import { useBanner } from '@/stores/modules/banner';
import { useProfile } from '@/stores/modules/profile';
const store = useProfile();
const settings = computed(() => store.getSettings);

</script>

<style scoped></style>
