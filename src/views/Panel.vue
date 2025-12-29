<template>
    <PanelLayout>
        <SideNavigation :expanded="expanded" @expanded="expand" />

        <div class="ps-0 transition-all duration-300 h-full overflow-y-auto hide-scroll"
            :class="{ 'lg:ms-72': !expanded, 'lg:ps-8': !expanded }">
            <Toolbar @expand="expand" />
            <div class="mt-4 pt-2">
                <RouterView></RouterView>
            </div>
        </div>
    </PanelLayout>

    <BaseModal v-model="show" :backdrop-close="false">
        <div class="content">
                <h6 class="text-md font-family-semi-bold mb-3">خطای معرف</h6>
                <p class="text-sm text-gray-800 mb-8">پنل شما به علت عدم وجود معرف بسته شده است لطفا کد معرف خود را وارد کنید</p>
                <Form @submit="submit" :validation-schema="schema" v-slot="{ meta }">
                    <FormInput type="text" label="کد معرف" dir="ltr" name="referral" hint="مانند:abcdefgh" />
                    <BaseButton class="w-full" type="submit" :disabled="!meta.valid || loading">ارسال کد</BaseButton>
                </Form>
            </div>
    </BaseModal>
</template>

<script setup>
import BaseLoading from '@/common/UI/BaseLoading.vue';
import SideNavigation from '@/components/panel/SideNavigation.vue';
import Toolbar from '@/components/panel/Toolbar.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
import { useProfile } from '@/stores/modules/profile';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { Form } from 'vee-validate';
import FormInput from '@/common/components/FormInput.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import { object, string } from 'yup';
import BaseModal from '@/common/UI/BaseModal.vue';
import { useModal } from '@/composables/useModal';
import { useErrors } from '@/composables/useError';

const schema = object({
    referral: string().required().min(8)
});
const expanded = ref(false);
const store = useProfile();
const windowWidth = ref(window.innerWidth);
const route = useRoute();
const { open } = useModal();
const show = ref(false);
const { displayError } = useErrors();

const loading = computed(() => store.loading);
const validity = computed(() => store.getValidity);
const user = computed(() => store.getUser);

const updateWidth = () => {
    windowWidth.value = window.innerWidth;
}

function expand() {
    expanded.value = !expanded.value
}
const submit = async (values) => {
    if (!values || !values.referral) return;

    try {
        const response = await store.checkReferral(values.referral);
        show.value = false;
        await store.fetchProfileInfo();
    } catch (error) {
        displayError(error);
    }
}
watch(windowWidth, (value) => {
    if (value < 992) {
        expanded.value = true;
    } else {
        expanded.value = false;
    }
}, { immediate: true });

watch(() => route.fullPath, (v1, v2) => {
    if (windowWidth.value > 992) return;

    expanded.value = true;
});

onMounted(async () => {
    await store.userValidity()
    await store.fetchProfileInfo();
    await store.fetchSettingsFromServe();
    checkValidtyForReferrall();
    window.addEventListener('resize', updateWidth);
});
function checkValidtyForReferrall() {
    if (!validity.value && !user.value.referred_by) {
        show.value = true
    }
}

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
</script>

<style scoped></style>