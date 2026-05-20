<template>
  <footer v-if="settings" class="bg-neutral-950 text-white">
    <div class="
        mx-auto w-11/12 max-w-[1400px] py-12
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10
      ">
      <!-- Logo & Description -->
      <div class="flex flex-col items-start gap-4">
        <Branding />
        <p class="text-sm text-neutral-300 leading-7">
          با اطمینان خاطر از برترین برندها و کمپانی های دنیا سفارش خود را تحویل خواهید گرفت ؛ تکین آراز پرگاس, پیشرو
          در عرضه
          خودروهای خارجی
        </p>
      </div>

      <!-- Address -->
      <div class="flex flex-col items-start gap-3">
        <h6 class="text-xl font-semibold text-yellow-300 mb-1">آدرس</h6>
        <div class="flex items-center gap-3 text-neutral-200">
          <IconLocation class="text-yellow-400/80 size-5" />
          <span>
            {{ settings.address_footer }}
          </span>
        </div>
        <div class="flex items-center mt-3 gap-3 text-neutral-200">
          <IconCheck class="text-yellow-400/80 size-5" />
          <span class="font-mono" dir="ltr">
            {{ settings.postal_code }}
          </span>
        </div>
      </div>

      <!-- Licenses/Permits -->
      <div class="flex flex-col items-start gap-3">
        <h6 class="text-xl font-semibold text-yellow-300 mb-1">مجوزها</h6>
        <a referrerpolicy="origin" target="_blank"
          href="https://trustseal.enamad.ir/?id=694396&amp;Code=p3XGWqUTOdQ7dBEZT2JNeq1oGbyKOleU"
          class="inline-block p-1 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/10 transition-colors duration-200">
          <img referrerpolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=694396&amp;Code=p3XGWqUTOdQ7dBEZT2JNeq1oGbyKOleU"
            alt="نماد اعتماد الکترونیکی" class="w-32 h-auto" />
        </a>
        <!-- Add other licenses here if needed -->
      </div>

      <!-- Quick Links (Example - add yours here) -->
      <div class="flex flex-col items-start gap-3">
        <h6 class="text-xl font-semibold text-yellow-300 mb-1">دسترسی سریع</h6>
        <ul class="space-y-2">
          <li>
            <a href="#" class="text-neutral-300 hover:text-yellow-400 transition-colors duration-200">درباره ما</a>
          </li>
          <li>
            <a href="#" class="text-neutral-300 hover:text-yellow-400 transition-colors duration-200">تماس با ما</a>
          </li>
          <li>
            <a href="#" class="text-neutral-300 hover:text-yellow-400 transition-colors duration-200">قوانین و
              مقررات</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="border-t border-white/20 py-5">
      <div class="flex flex-col md:flex-row items-center justify-center gap-2 text-xs">
        <span class="text-neutral-400">
          {{ $filters.date(Date.now(), "year") }} - {{ gregorian }}
        </span>
        <span class="text-white hidden md:inline-block">•</span>
        <p class="text-neutral-300">
          تمامی حقوق وب سایت برای شرکت تکین آراز پرگاس محفوظ است.
        </p>
        <span class="text-neutral-400">
          طراحی و پیاده سازی توسط
        </span>
        <a href="https://padhosha.ir" target="_blank"
          class="text-yellow-300 hover:text-yellow-200 font-semibold transition-colors duration-200">
          تیم پدهوشا
        </a>
      </div>
    </div>
  </footer>
  <nav class="md:hidden block">
    <div
      class="bg-black w-full fixed z-[6000] flex items-center gap-1 justify-between px-3 py-3 bottom-0 right-0 md:hidden">
      <RouterLink to="/" class="flex items-center gap-3"
        active-class="relative text-blue-700 marker before:bg-blue-600">
        <IconHome :color="'white'" />
        <span class="font-medium text-white font-family-semi-bold text-md">خانه</span>
      </RouterLink>
      <RouterLink :to="auth.hasToken? '/user-panel' : '/check-mobile'" class="flex items-center gap-3"
        active-class="relative text-blue-700 marker before:bg-blue-600">
        <IconPersonStatus />
        <span class="font-medium text-white font-family-semi-bold text-md">پروفایل </span>
      </RouterLink>
      <RouterLink to="/cars" class="flex items-center gap-3"
        active-class="relative text-blue-700 marker before:bg-blue-600">
        <IconCar />

        <span class="font-medium text-white font-family-semi-bold text-md">خودرو ها</span>
      </RouterLink>

      <RouterLink to="/contact-us" class="flex items-center gap-3"
        active-class="relative text-blue-700 marker before:bg-blue-600">
        <IconPhone />
        <span class="font-medium text-white font-family-semi-bold text-md">تماس با ما</span>
      </RouterLink>

    </div>
  </nav>
</template>

<script setup>
import Branding from "@/common/components/Branding.vue";
import IconCheck from "@/common/icons/IconCheck.vue";
import IconLocation from "@/common/icons/IconLocation.vue";
import { useMenu } from "@/stores/modules/menu";
import { computed, ref } from "vue";
import { useProfile } from '@/stores/modules/profile';
import IconHome from "@/common/icons/iconHome.vue";
import IconPersonStatus from "@/common/icons/IconPersonStatus.vue";
import IconCar from "@/common/icons/iconCar.vue";
import IconPhone from "@/common/icons/IconPhone.vue";
import { useAuth } from "@/stores/modules/auth";
const auth = useAuth();
const store1 = useProfile()
const settings = computed(() => store1.getSettings);

const store = useMenu();
const menus = computed(() => store.menus);

const gregorian = computed(() => new Date().getFullYear());
</script>

<style scoped></style>
