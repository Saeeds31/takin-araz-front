<template>
    <div class="h-full flex gap-8">
        <div class="w-1/2 grow">
            <VerifyCode />
        </div>
        <div v-if="sliders" class="w-1/2 grow hidden lg:block">
            <img src="@/assets/images/login.png" class="w-[60%] " alt="">
        </div>
    </div>
</template>

<script setup>
import VerifyCode from '@/components/auth/VerifyCode.vue';
import { useAuth } from '@/stores/modules/auth';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSlider } from '@/stores/modules/slider';

const router = useRouter();
const store = useAuth();
const store1 = useSlider();

const mobile = computed(() => store.mobile);
const sliders = computed(() => {
    return store1.getSliders;
})
onMounted(() => {
    if (!mobile.value) {
        router.push({ name: 'Check' });
    }
})

</script>

<style scoped></style>