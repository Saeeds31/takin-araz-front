<template>
    <div class="flex justify-center">
        <div class="w-full lg:w-2/3 relative">
            <img src="/src/assets/images/card-front.png" alt="card">

            <span class="block absolute font-semibold top-[28%] right-[13%] text-xs md:text-sm lg:text-md">{{ user?.full_name }}</span>
            <span class="block absolute font-semibold top-[38%] right-[18%] text-xs md:text-sm lg:text-md">{{ user?.national_code }}</span>

            <BaseAvatr class="absolute top-1/2 -translate-y-1/2 left-1/12" :src="avatar" size="lg" />
        </div>
    </div>
</template>

<script setup>
import { useProfile } from '@/stores/modules/profile';
import image from "@/assets/images/placeholder-image.png";
import { computed, ref } from 'vue'
import BaseAvatr from '@/common/UI/BaseAvatr.vue';

const store = useProfile();

const user = computed(() => store.user);
const avatar = computed(() => user?.image || image);
</script>

<style scoped></style>