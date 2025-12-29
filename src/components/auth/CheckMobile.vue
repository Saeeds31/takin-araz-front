<template>
    <div class="h-full relative flex flex-col items-center justify-start lg:justify-center">
        <div class="w-full lg:w-1/2">
            <Branding class="mb-10" />

            <h2 class="text-center text-2xl font-family-bold mb-16">ورود | ثبت نام</h2>

            <Form @submit="submit" :validation-schema="schema" v-slot="{ meta }">
                <FormInput type="tel" label="شماره تلفن" dir="ltr" name="mobile" hint="شماره موبایل خود را وارد کنید" />
                <BaseButton class="bg-base" type="submit" :disabled="!meta.valid || loading">ارسال کد
                </BaseButton>
            </Form>
        </div>

        <div class="grow lg:grow-0"></div>
        <CopyRight class="lg:absolute lg:bottom-0" />
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { Form } from 'vee-validate';
import { object, string } from 'yup'
import { useAuth } from '@/stores/modules/auth';
import FormInput from '@/common/components/FormInput.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import CopyRight from '@/common/components/CopyRight.vue';
import Branding from '@/common/components/Branding.vue';
import { useRoute, useRouter } from 'vue-router';
import { useErrors } from '@/composables/useError';

const store = useAuth();
const router = useRouter();
const { displayError } = useErrors();
const route = useRoute();

const schema = object({
    mobile: string().required().min(11)
});

const loading = computed(() => store.loading);

const submit = async (values) => {
    if (!values || !values.mobile) return;
    try {
        const response = await store.check(values.mobile);
        router.push({ name: 'Verify', query: { mode: response.status || 'unknown' } });

    } catch (error) {
        displayError(error);
    }
}

</script>

<style scoped></style>