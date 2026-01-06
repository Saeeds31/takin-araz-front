<template>
    <nav :class="{ opened: openedMobile }" id="mainMenu">
        <button class="block md:hidden fixed left-5 top-4 z-[1000]" @click="CloseMenu()">
            <IconClose color="white" />
        </button>
        <ul class="flex items-center gap-4">
            <li v-for="(item, index) in list" :key="index">
                <a :href="item.link">
                    {{ item.title }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import IconClose from '../icons/IconClose.vue';

const props = defineProps({
    list: Array,
    openedMobile: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['closeMenu']);
function CloseMenu() {
    emits('closeMenu');
}
</script>

<style scoped>
@media (max-width:768px) {
    #mainMenu ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #mainMenu ul li a {
        color: white;
    }

    #mainMenu {
        position: fixed;
        right: 0;
        top: -100vh;
        left: 0;
        background: #000000de;
        height: 100vh;
        z-index: 100;
        width: 100vw;
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #mainMenu.opened {
        animation: opened 0.7s linear forwards;
    }

    @keyframes opened {
        from {
            top: -100vh;
        }

        to {
            top: 0
        }
    }
}
</style>