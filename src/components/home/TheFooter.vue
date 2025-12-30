<template>
  <footer>
    <div class="mt-20 px-6 bg-[#42043f] text-white">
      <div class="flex justify-between w-11/12 max-w-[1400px] mx-auto flex-wrap py-12">
        <div class="mb-6">
          <Branding />
          <p>
            با اطمینان خاطر از برترین برندها و کمپانی های دنیا سفارش خود را تحویل خواهید گرفت ؛ تکین آراز پیشرو در عرضه
            خودروهای خارجی
          </p>
        </div>
        <div class="mb-6">
          <h6 class="mb-4 text-white font-family-semi-bold">آدرس</h6>
          <div class="flex items-center gap-2">
            <IconLocation color="white" />
            <span class="font-family-regular text-white">
              مازندران ساری بلوار خزر دریای 17
            </span>
          </div>
          <div class="flex items-center mt-4 gap-2 mb-2">
            <IconPhone color="white" />
            <span class="font-family-regular text-white" dir="ltr">09112490613</span>
          </div>
        </div>

        <div class="mb-6">
          <h6 class="mb-4 text-white font-family-semi-bold">مجوزها</h6>
          <div class="flex items-center gap-2">
            <a referrerpolicy='origin' target='_blank'
              href='https://trustseal.enamad.ir/?id=694396&Code=p3XGWqUTOdQ7dBEZT2JNeq1oGbyKOleU'><img
                referrerpolicy='origin'
                src='https://trustseal.enamad.ir/logo.aspx?id=694396&Code=p3XGWqUTOdQ7dBEZT2JNeq1oGbyKOleU' alt=''
                style='cursor:pointer' code='p3XGWqUTOdQ7dBEZT2JNeq1oGbyKOleU'></a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/60 py-4">
        <div class="flex flex-col md:flex-row items-center justify-center gap-2">
          <span class="text-white text-xs text-nowrap">{{ $filters.date(Date.now(), "year") }} - {{ gregorian }}</span>
          <span class="text-white hidden md:block">•</span>
          <p class="text-white text-xs text-nowrap">تمامی حقوق وب سایت برای شرکت تکین آراز پرگاس محفوظ است.</p>
          <a href="https://padhosha.ir" target="_blank" class="text-white text-xs text-nowrap"> طراحی و پیاده سازی توسط
            تیم <b>پدهوشا</b> </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Branding from "@/common/components/Branding.vue";
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
