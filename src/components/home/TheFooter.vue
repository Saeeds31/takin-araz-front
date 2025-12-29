<template>
  <footer>
    <div class="mt-20 px-6 bg-[#2E31A7]">
      <div class="flex justify-between w-11/12 max-w-[1400px] mx-auto flex-wrap py-12">
        <div class="mb-6">
          <h6 class="mb-4 text-white font-family-semi-bold">لینک های مهم</h6>
          <ul class="flex items-center gap-6 flex-wrap">
            <li v-for="(menu, index) in menus">
              <a :href="menu?.link" class="flex items-center gap-2 text-white">
                <img :src="$filters.resource(menu?.icon)" alt="" />
                <span class="text-sm text-inherit">{{ menu?.title }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="mb-6">
          <h6 class="mb-4 text-white font-family-semi-bold">آدرس</h6>
          <div class="flex items-center gap-2">
            <IconLocation color="white" />
            <span class="font-family-regular text-white">مازندران ، همین نزدیکیا .....</span>
          </div>
        </div>
        <div class="mb-6">
          <h6 class="mb-4 text-white font-family-semi-bold">تماس با ما</h6>
          <div class="flex items-center gap-2 mb-2">
            <IconPhone color="white" />
            <span class="font-family-regular text-white" dir="ltr">017 - 321 22 333</span>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <IconMobile color="white" />
            <span class="font-family-regular text-white" dir="ltr">0919 - 099 - 6808</span>
          </div>
          <p class="text-white text-xs">پاسخگویی در روزها و ساعات اداری.</p>
        </div>
      </div>
      <div class="border-t border-white/60 py-4">
        <div class="flex flex-col md:flex-row items-center justify-center gap-2">
          <span class="text-white text-xs text-nowrap">{{ $filters.date(Date.now(), "year") }} - {{ gregorian }}</span>
          <span class="text-white hidden md:block">•</span>
          <p class="text-white text-xs text-nowrap">تمامی حقوق وب سایت برای شرکت تکین آرتا پرگاس محفوظ است.</p>
          <a href="https://padhosha.ir" target="_blank" class="text-white text-xs text-nowrap"> طراحی و پیاده سازی توسط تیم <b>پدهوشا</b> </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import IconLocation from "@/common/icons/IconLocation.vue";
import IconMobile from "@/common/icons/IconMobile.vue";
import IconPhone from "@/common/icons/IconPhone.vue";
import { useMenu } from "@/stores/modules/menu";
import { computed, ref } from "vue";

const store = useMenu();
const menus = computed(() => store.menus);

const gregorian = computed(() => new Date().getFullYear());
</script>

<style scoped></style>
