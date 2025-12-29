<template>
    <ul>
        <BaseAccordion :is-expand="true">
            <template #header>
                <div class="flex items-center gap-3">
                    <IconPersonEdit />
                    <span class="font-medium font-family-semi-bold text-md">مراحل اطلاعات شخصی</span>
                </div>
            </template>

            <template #submenu>
                <ul>
                    <li class="py-2 flex flex-col gap-1">
                        <RouterLink to="/panel/identity-info"
                            active-class="relative text-blue-700 marker before:bg-blue-600">اطلاعات هویتی</RouterLink>
                        <Badge :status="status(1)" />
                    </li>
                    <li class="py-2 flex flex-col gap-1">
                        <RouterLink to="/panel/identity-docs"
                            active-class="relative text-blue-700 marker before:bg-blue-600">مدارک هویتی</RouterLink>
                        <Badge :status="status(2)" />
                    </li>
                    <li class="py-2 flex flex-col gap-1">
                        <RouterLink to="/panel/physical-info"
                            active-class="relative text-blue-700 marker before:bg-blue-600">مشخصات جسمانی</RouterLink>
                        <Badge :status="status(3)" />
                    </li>
                    <li class="py-2 flex flex-col gap-1">
                        <RouterLink to="/panel/education-docs"
                            active-class="relative text-blue-700 marker before:bg-blue-600">مدارک تحصیلی</RouterLink>
                        <Badge :status="status(4)" />
                    </li>
                </ul>
            </template>
        </BaseAccordion>
        <BaseAccordion :is-expand="true">
            <template #header>
                <div class="flex items-center gap-3">
                    <IconCourses />
                    <span class="font-medium font-family-semi-bold text-md">دوره ها</span>
                </div>
            </template>

            <template #submenu>
                <ul>
                    <li class="py-2">
                        <RouterLink to="/panel/courses" active-class="relative text-blue-700 marker before:bg-blue-600">
                            مشاهده دوره ها</RouterLink>
                    </li>
                    <li class="py-2">
                        <RouterLink to="/panel/purchased"
                            active-class="relative text-blue-700 marker before:bg-blue-600">دوره های خریداری شده
                        </RouterLink>
                    </li>
                </ul>
            </template>
        </BaseAccordion>
        <BaseAccordion :is-expand="true"> 
            <template #header>
                <div class="flex items-center gap-3">
                    <IconWallet />
                    <span class="font-medium font-family-semi-bold text-md">کیف پول</span>
                </div>
            </template>
            <template #submenu>
                <ul>
                    <li class="py-2">
                        <RouterLink to="/panel/wallet" active-class="relative text-blue-700 marker before:bg-blue-600">
                            کیف پول</RouterLink>
                    </li>
                    
                    <li class="py-2">
                        <RouterLink to="/panel/receipts" active-class="relative text-blue-700 marker before:bg-blue-600">
                            ثبت رسید</RouterLink>
                    </li>
                </ul>
            </template>
        </BaseAccordion>
        <!-- <BaseAccordion>
        <template #header>
            <RouterLink to="/panel/membership" class="flex items-center gap-3" active-class="relative text-blue-700 marker before:bg-blue-600">
                <IconPersonCard />
                <span class="font-medium font-family-semi-bold text-md">کارت عضویت</span>
            </RouterLink>
        </template>
    </BaseAccordion> -->
        <BaseAccordion>
            <template #header>
                <RouterLink to="/panel/status" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconPersonStatus />
                    <span class="font-medium font-family-semi-bold text-md">وضعیت کاربر</span>
                </RouterLink>
            </template>
        </BaseAccordion>
        <BaseAccordion>
            <template #header>
                <RouterLink to="/panel/contact" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconMessage />
                    <span class="font-medium font-family-semi-bold text-md">ارتباط با مدیر - بازرس</span>
                </RouterLink>
            </template>
        </BaseAccordion>
        <BaseAccordion>
            <template #header>
                <RouterLink to="/panel/referral" class="flex items-center gap-3"
                    active-class="relative text-blue-700 marker before:bg-blue-600">
                    <IconPersonCard />
                    <span class="font-medium font-family-semi-bold text-md">کدمعرف</span>
                </RouterLink>
            </template>
        </BaseAccordion>
    </ul>
</template>

<script setup>
import IconCourses from '@/common/icons/IconCourses.vue';
import IconMessage from '@/common/icons/IconMessage.vue';
import IconPersonCard from '@/common/icons/IconPersonCard.vue';
import IconPersonEdit from '@/common/icons/IconPersonEdit.vue';
import IconPersonStatus from '@/common/icons/IconPersonStatus.vue';
import IconWallet from '@/common/icons/IconWallet.vue';
import BaseAccordion from '@/common/UI/BaseAccordion.vue';
import { computed, ref } from 'vue'
import Badge from './Badge.vue';
import { useProfile } from '@/stores/modules/profile';

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