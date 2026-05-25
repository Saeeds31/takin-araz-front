<template>
    <ul>
        <BaseAccordion>
            <template #header>
                <RouterLink to="/user-panel" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconPersonStatus />
                    <span class="font-medium text-white font-family-semi-bold text-md">پروفایل کاربر</span>
                </RouterLink>
            </template>
        </BaseAccordion>
        <BaseAccordion>
            <template #header>
                <RouterLink to="/user-panel/receipts" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconInvoice :color="'white'" />

                    <span class="font-medium text-white font-family-semi-bold text-md">رسید های واریزی</span>
                </RouterLink>
            </template>
        </BaseAccordion>

        <BaseAccordion>
            <template #header>
                <RouterLink to="/user-panel/requests" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconCar />
                    <span class="font-medium text-white font-family-semi-bold text-md">درخواست های ثبت شده</span>
                </RouterLink>
            </template>
        </BaseAccordion>
        <BaseAccordion>
            <template #header>
                <RouterLink to="/user-panel/wallet" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconWallet :color="'white'" />
                    <span class="font-medium text-white font-family-semi-bold text-md">کیف پول</span>
                </RouterLink>
            </template>
        </BaseAccordion>
        <BaseAccordion>
            <template #header>
                <RouterLink to="/check-mobile" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconLogout :color="'white'" />
                    <span class="font-medium text-white font-family-semi-bold text-md">خروج از سیستم</span>
                </RouterLink>
            </template>
        </BaseAccordion>


    </ul>
</template>

<script setup>
import IconPersonStatus from '@/common/icons/IconPersonStatus.vue';
import IconWallet from '@/common/icons/IconWallet.vue';
import BaseAccordion from '@/common/UI/BaseAccordion.vue';
import { computed, ref } from 'vue'
import { useProfile } from '@/stores/modules/profile';
import IconCar from '@/common/icons/iconCar.vue';
import IconLogout from '@/common/icons/IconLogout.vue';
import IconInvoice from '@/common/icons/IconInvoice.vue';

const store = useProfile();

const registers = computed(() => store.getRegister);

const status = (step) => {
    const find = registers.value?.find(r => r.step === step);

    if (!find) return null;

    return find.status || null;
}

</script>

<style scoped>
.marker::before {
    content: "";
    display: block;
    position: absolute;
    inset-inline-end: 104%;
    width: 0.25rem;
    height: 110%;
    border-radius: 999px;
}
</style>