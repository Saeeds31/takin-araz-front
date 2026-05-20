<template>
    <header id="header" class="w-[100vw] bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white py-3">
        <!-- Top Bar -->
        <section v-if="settings" id="topBar"
            class="flex lg:justify-between justify-center items-center px-[5%] py-2 text-white/80 relative">
            <!-- Hidden on large screens, shown as part of mobile menu maybe -->

            <p class="hidden lg:block text-sm">
                {{ settings.header_text_1 }}
            </p>
            <p class="hidden lg:block text-sm ">
                {{ settings.header_text_2 }}
            </p>
            <div class="flex md:flex-row flex-col gap-3 items-center text-xs lg:text-sm whitespace-nowrap">
                <span>پشتیبانی همه روزه از ساعت 10 تا 17</span>
                <b class="text-yellow-400 text-base lg:text-lg lg:whitespace-pre whitespace-normal">
                    {{ settings.header_phone }}
                </b>
            </div>
        </section>

        <!-- Main Header -->
        <section id="mainHeader" class="md:flex hidden items-center justify-between px-[5%] py-3 md:relative">
            <!-- Mobile Menu Button (visible on small screens) -->
            <button class="block md:hidden z-30" @click="openedMobile = true">
                <svg class="w-8 h-8 text-white/90 hover:text-yellow-400 transition duration-300" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
            </button>

            <!-- Branding -->
            <div class="flex justify-center lg:justify-start">
                <Branding class="w-40 lg:w-48" />
            </div>

            <!-- Navigation Menus -->
            <Menus @closeMenu="openedMobile = false" :openedMobile="openedMobile" :list="menus" />

            <!-- Login/User Button -->
            <router-link id="loginBtn"
                class="group relative rounded-full flex items-center gap-3 px-4 lg:py-2 py-1 py-2 transition duration-500 border border-white/20 hover:border-yellow-400 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                :to="user ? '/user-panel' : '/check-mobile'">
                <svg class="lg:block hidden w-6 h-6 text-white/80 group-hover:text-yellow-400 transition duration-300"
                    fill="none" viewBox="0 0 24 24">
                    <path
                        d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                        stroke="currentColor" stroke-width="1.5" />
                    <path
                        d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z"
                        stroke="currentColor" stroke-width="1.5" />
                </svg>
                <span
                    class="text-white/80 group-hover:text-yellow-400 lg:text-2xl text-[12px] transition  duration-300">
                    {{ user ? "مشاهده حساب کاربری" : 'ورود | عضویت' }}
                </span>
                <!-- Subtle glow effect on hover -->
                <span
                    class="absolute inset-0 w-full h-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out bg-yellow-400/20 rounded-full -z-10"></span>
            </router-link>

            <!-- Breadcrumbs - Example (Add your actual breadcrumb logic here) -->
            <div v-if="showBreadcrumbs"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-full px-[5%] py-1 text-sm text-gray-400">
                <nav aria-label="Breadcrumb">
                    <ol class="flex items-center gap-2">
                        <li>
                            <router-link to="/" class="hover:text-yellow-400 transition">خانه</router-link>
                        </li>
                        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 8.25-7.5 8.25" />
                            </svg>
                            <router-link :to="crumb.to" class="hover:text-yellow-400 transition">{{ crumb.text
                                }}</router-link>
                        </li>
                    </ol>
                </nav>
            </div>
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
import { useAuth } from "@/stores/modules/auth";
const auth = useAuth();

const store = useProfile();
const store1 = useMenu();
const menus = computed(() => store1.menus);
const settings = computed(() => store.getSettings);
const user = computed(() => store.user);
store1.getMenuFromServer()
try {
    if (auth.hasToken)
        store.fetchProfileInfo();
} catch (error) {
    console.log(error);
}
let openedMobile = ref(false);
</script>

<style scoped>
header #topBar {
    background-color: #230069;
}

#loginBtn {
    background-color: #ABA900;
}

#header {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    /* Subtle shadow for depth */
}

#topBar {
    /* background: linear-gradient(to right, #1F2937, #0F172A); */
    /* Example gradient */
}

#mainHeader {
    /* background: linear-gradient(to right, #111827, #0F172A); */
    /* Darker gradient for main header */
}

/* Button hover effects */
.group:hover #loginBtn span:not(.scale-0) {
    transform: scaleX(0);
}

.group:hover #loginBtn span.scale-0 {
    transform: scaleX(1);
}

/* Make sure the mobile menu button is on top */
.md\:hidden {
    display: block;
}

@media (min-width: 768px) {
    .md\:hidden {
        display: none;
    }
}

@media (max-width: 768px) {

    header #topBar {
        background-color: #0e1524;
    }

    #header {
        background: #0e1524;
    }
}


/* Subtle glow effect for the login button */
#loginBtn:hover .glow {
    transform: scale(1);
}
</style>