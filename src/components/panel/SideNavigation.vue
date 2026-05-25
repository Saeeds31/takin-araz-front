<template>
    <!-- Backdrop--mobile -->
    <div class="hidden md:block absolute z-20 w-full h-full inset-0 bg-black/10 rounded-lg lg:hidden"
        :class="{ 'hidden': expanded || false }" @click="emit('expanded')"></div>

    <div class="hidden md:block absolute overflow-y-auto z-20 top-0 bottom-0 start-0 w-72 h-full rounded-lg bg-gray-900 px-4 py-4 transition-transform duration-300"
        :class="{ 'translate-x-full': expanded || false }">
        <SideMenu />
    </div>
    <div
        class="bg-black w-full fixed flex items-center gap-1 justify-between px-3 py-3 z-[5000] bottom-0 right-0 md:hidden">
        <RouterLink :class="{ 'activeLink': route.path == '/' }" to="/" class="flex items-center gap-3"
            active-class="relative text-blue-700 marker before:bg-blue-600">
            <IconHome :color="'white'" />
            <span class="font-medium text-white font-family-semi-bold text-md hidden">خانه</span>
        </RouterLink>
        <RouterLink :class="{ 'activeLink': route.path == '/user-panel' }" to="/user-panel"
            class="flex items-center gap-3" active-class="relative text-blue-700 marker before:bg-blue-600">
            <IconPersonStatus />
            <span class="font-medium text-white font-family-semi-bold text-md hidden">پروفایل </span>
        </RouterLink>
        <RouterLink :class="{ 'activeLink': route.path == '/user-panel/receipts' }" to="/user-panel/receipts"
            class="flex items-center gap-3" active-class="relative text-blue-700 marker before:bg-blue-600">
            <IconWallet />

            <span class="font-medium text-white font-family-semi-bold text-md hidden">رسید</span>
        </RouterLink>

        <RouterLink :class="{ 'activeLink': route.path == '/user-panel/requests' }" to="/user-panel/requests"
            class="flex items-center gap-3" active-class="relative text-blue-700 marker before:bg-blue-600">
            <IconCar />
            <span class="font-medium text-white font-family-semi-bold text-md hidden">درخواست ها</span>
        </RouterLink>

    </div>
</template>

<script setup>
import IconPersonStatus from '@/common/icons/IconPersonStatus.vue';
import SideMenu from './SideMenu.vue';
import IconWallet from '@/common/icons/IconWallet.vue';
import IconCar from '@/common/icons/iconCar.vue';
import IconHome from '@/common/icons/iconHome.vue';
import { useRoute } from 'vue-router';
const route=useRoute()
defineProps(['expanded']);
const emit = defineEmits(['expanded']);

</script>
<style>
.activeLink {
    border-bottom: 2px solid #a9f72c;
    border-radius: 8px;
    padding: 0 8px;
    padding-bottom: 4px;
}

.activeLink span {
    display: block !important;
}
</style>