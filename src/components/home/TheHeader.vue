<template>
    <header class="w-screen">
        <section v-if="settings" id="topBar" class="flex   items-center lg:justify-between justify-center px-[5%] py-4 text-white">
            <p class="hidden lg:block">
                {{ settings.header_text_1 }}
            </p>
            <p class="hidden lg:block">
                {{ settings.header_text_2 }}
            </p>
            <p class="flex gap-2 items-center">
                <span class="text-[12px]">پشتیبانی همه روزه از ساعت 10 تا 17</span>

                <b>
                    {{ settings.header_phone }}
                </b>
            </p>
        </section>
        <section id="mainHeader" class="flex items-center justify-between px-[5%] py-3">
            <button class="block md:hidden" @click="openedMobile=true">
                <IconMenu />
            </button>
            <Branding />
            <Menus @closeMenu="openedMobile=false" :openedMobile="openedMobile" :list="menus" />
            <router-link v-if="!user" id="loginBtn" class="rounded flex items-center gap-3 px-2 py-1.5"
                to="/check-mobile">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                        stroke="white" />
                    <path
                        d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z"
                        stroke="white" />
                </svg>
                <span class="text-white">ورود | عضویت</span>
            </router-link>
            <router-link v-else id="loginBtn" class="rounded flex items-center gap-3 px-2 py-1.5" to="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                        stroke="white" />
                    <path
                        d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z"
                        stroke="white" />
                </svg>
                <span class="text-white">
                    {{ user.full_name ?? user.mobile }}
                </span>
            </router-link>

        </section>
    </header>
</template>

<script setup>
import Branding from '@/common/components/Branding.vue';
import Menus from '@/common/components/Menus.vue';
import { useProfile } from '@/stores/modules/profile';
import { useMenu } from '@/stores/modules/menu.js';
import { computed, onMounted, ref } from 'vue'
import IconMenu from '@/common/icons/IconMenu.vue';
const store = useProfile();
const store1 = useMenu();
const menus = computed(() => store1.menus);
const settings = computed(() => store.getSettings);
const user = computed(() => store.user);
store1.getMenuFromServer()
store.fetchProfileInfo();
let openedMobile=ref(false);
</script>

<style scoped>
header #topBar {
    background-color: #230069;
}

#loginBtn {
    background-color: #ABA900;
}
</style>