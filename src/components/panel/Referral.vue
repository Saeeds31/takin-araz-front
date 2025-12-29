<template>
    <h6 class="text-xl font-family-semi-bold mb-3">کدمعرف</h6>
    <p class="text-md text-gray-800 mb-4">برای دریافت کدمعرف روی دکمه کپی لینک کلیک کنید</p>

    <div class="flex items-stretch flex-wrap gap-3">
        <span class="border-2 border-gray-500 border-dashed rounded-sm flex items-center py-3 text-gray-700 text-sm font-family-semi-bold w-full px-4 md:px-20 md:w-auto select-none">
            دریافت کدمعرف
        </span>
        <BaseButton @click="clipboard">کپی لینک</BaseButton>
    </div>
</template>

<script setup>
import BaseButton from '@/common/UI/BaseButton.vue';
import { useProfile } from '@/stores/modules/profile';
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify';

const store = useProfile();

const user = computed(() => store.user);

const clipboard = async () => {
    const link = `https://security-tap.ir/check-mobile?referral_code=${user.value.referral_code}`;
    await navigator.clipboard.writeText(link);

    toast.info('کد با موفقیت کپی شد');
}

</script>

<style scoped></style>