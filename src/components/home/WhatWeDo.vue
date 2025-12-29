<template>
  <div class="mt-20">
    <h2 class="mb-10 text-2xl font-family-bold text-center">چه کاری انجام می‌دهیم؟</h2>

    <div class="flex gap-10 flex-col lg:flex-row">
      <div class="w-[100%] md:w-[70%]">
        <p class="leading-8  font-family-regular mb-4">
          {{ settings?.whatwedo }}
        </p>
       

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <template v-for="item in items" :key="item.id">
            <div
              class="border border-neutral-300 rounded-lg px-3 py-3 hover:border-transparent hover:bg-secondary group transition-all duration-200 select-none">
              <div class="flex items-center justify-between gap-2 mb-4">
                <div
                  class="flex items-center justify-center rounded-full bg-neutral-400 size-11 text-white group-hover:text-secondary group-hover:bg-white">
                  <IconCertificate v-if="item.icon == 'certificate'" />
                  <IconExam v-if="item.icon == 'exam'" />
                  <IconLean v-if="item.icon == 'learn'" />
                  <IconTarget v-if="item.icon == 'target'" />
                </div>
                <h3 class="font-family-bold text-md text-neutral-500 group-hover:text-white">{{ item.title }}</h3>
                <div class="grow"></div>
                <span class="text-2xl font-black font-family-bold text-neutral-300 self-start group-hover:text-white">{{
                  item.index }}</span>
              </div>

              <p class="text-md text-neutral-500 group-hover:text-white font-family-regular">{{
                settings ? settings[`step${item.id}`] : ""
              }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Image -->
      <div class="hidden lg:block">
        <div class="relative">
          <div class="max-h-[500px] aspect-square rounded-xl overflow-hidden relative z-20">
            <img class="h-full" :src="what_we_do_img" alt="" />
          </div>

          <div class="absolute -bottom-3 -start-3 z-10 size-10 bg-secondary rounded-lg"></div>
          <div class="absolute -top-3 -end-3 z-10 size-10 bg-secondary rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfile } from '@/stores/modules/profile';
import IconCertificate from "@/common/icons/IconCertificate.vue";
import IconExam from "@/common/icons/IconExam.vue";
import IconLean from "@/common/icons/IconLean.vue";
import image from "@/assets/images/samples/what.png";
import { computed, ref } from "vue";
import IconTarget from "@/common/icons/IconTarget.vue";
const store = useProfile();
const settings = computed(() => store.getSettings);

const what_we_do_img = image;

const items = ref([
  {
    id: 1,
    title: "دوره‌",
    index: "01",
    icon: "certificate",
  },
  {
    id: 2,
    title: "آزمون‌",
    index: "02",
    icon: "exam",
  },
  {
    id: 3,
    title: "منابع آموزشی",
    index: "03",
    icon: "learn",
  },
  {
    id: 4,
    title: "رویکرد",
    index: "04",
    icon: "target",
  },
]);
</script>

<style scoped></style>
