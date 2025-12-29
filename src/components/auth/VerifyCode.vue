<template>
    <div class="h-full relative flex flex-col items-center justify-start lg:justify-center">
        <div class="w-full lg:w-1/2">
            <Branding class="mb-10" />

            <p class="text-center text-md mb-2">
                کد تایید به شماره
                <span class="mx-1">( {{ masked }} )</span>
                ارسال شد
            </p>
            <div class="flex items-center justify-center gap-2 mb-16 text-sm text-center">
                <span v-if="resend && !timer" @click="resendCode"
                    class="cursor-pointer text-blue-400 font-family-semi-bold">
                    دریافت مجدد کد
                </span>
                <span v-else class="text-gray-500 word-tracking-wider"> {{ timer }} ثانیه مانده تا دریافت مجدد کد تایید
                </span>
            </div>

            <form @submit.prevent="submit">
                <BaseCodeInput :length="6" v-model="token" />
                <BaseButton class="w-full bg-base" type="submit" :disabled="loading">ارسال کد</BaseButton>
            </form>
        </div>

        <CopyRight class="absolute bottom-0" />
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useAuth } from '@/stores/modules/auth';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseCodeInput from '@/common/UI/BaseCodeInput.vue';
import CopyRight from '@/common/components/CopyRight.vue';
import Branding from '@/common/components/Branding.vue';
import { useErrors } from '@/composables/useError';
import { useMask } from '@/composables/useMask';
import { useRoute, useRouter } from 'vue-router';
import { useProfile } from '@/stores/modules/profile';

const store = useAuth();
const profileStore = useProfile();
const { displayError } = useErrors();
const { masked, setMobile } = useMask();
const router = useRouter();
const route = useRoute();

const token = ref('');
const resend = ref(false);
const timer = ref(60);
const intervalId = ref(null);

const loading = computed(() => store.loading);
const mobile = computed(() => store.mobile);
const mode = computed(() => route.query['mode']);

setMobile(mobile.value);

const startResendTimer = () => {
    clearInterval(intervalId.value);

    resend.value = false;
    timer.value = 60;

    intervalId.value = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            clearInterval(intervalId.value);
            intervalId.value = null;
            resend.value = true;
        }
    }, 1000);
}

const resendCode = async () => {
    if (loading.value) return;

    try {
        resend.value = false;
        timer.value = 60;
        const response = await store.resend();
        startResendTimer();
    } catch (error) {
        displayError(error);
    }
}

const submit = async () => {
    if (!token.value) return;

    try {
        const successful = await store.verify(token.value);

        if (successful) {
            if (mode.value === 'login') {
                profileStore.fetchProfileInfo()
                router.push(window.localStorage.getItem('lastpage') ?? '/')
            } else {
                router.push({ name: 'Register' });
            }
        }
    } catch (error) {
        displayError(error);
    }
}

onMounted(() => {
    startResendTimer();
});

onUnmounted(() => {
    clearInterval(intervalId.value);
});

</script>

<style scoped></style>