<template>
  <div class="grid lg:grid-cols-[2fr_3fr] grid-cols-1 items-center w-[90%] mx-auto" v-if="settings">
    <div class="flex flex-col items-start gap-2">
      <h2 class="font-bold">پیش فروش تکین آراز پرگاس </h2>
      <h3 class="font-bold text-black">
        {{ settings?.about_home }}
      </h3>
      <p class="whitespace-pre leading-6">
        {{ settings?.about_text }}
      </p>
      <div class="flex items-center gap-2">
        <BaseButton @click="gotoDownload()" class=" base-back">
          <IconPdf />
          <span>
            دریافت قیمت های بروز خودرو

          </span>
        </BaseButton>
        <BaseButton to="#" class=" base-back-border bg-transparent base-color">
          اطلاعیه ها
        </BaseButton>
      </div>

    </div>
    <div class="flex items-center gap-2">
      <img class="w-[50%]" v-lazy="about1Image" alt="">
      <img class="w-[50%]" v-lazy="about2Image" alt="">
    </div>
  </div>
</template>

<script setup>
import about1Image from '@/assets/images/home/about2.png'
import about2Image from '@/assets/images/home/about1.png'
import BaseButton from '@/common/UI/BaseButton.vue';
import { computed, onMounted, ref } from "vue";
import { useBanner } from '@/stores/modules/banner';
import { useProfile } from '@/stores/modules/profile';
import IconPdf from '@/common/icons/IconPdf.vue';
const store = useProfile();
const settings = computed(() => store.getSettings);
function gotoDownload() {
  if (settings.value && settings.value.car_prices)
    window.open('https://api.car-tap.ir/public/uploads/' + settings.value.car_prices, '_blank')
}
</script>

<style scoped></style>
