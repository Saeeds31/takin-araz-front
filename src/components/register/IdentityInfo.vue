<template>
    <h2 class="text-2xl mb-6 text-center font-family-semi-bold">اطلاعات هویتی</h2>
    <BaseCard class="mt-4 mb-8" mode="primary"
        v-if="isProfile && currentRegister && currentRegister.status == 'rejected'">
        <h6 class="text-sm font-family-semi-bold mb-3">اشکالات و نواقص :</h6>
        <p class="text-sm text-red-600">{{ currentRegister?.error_note }}</p>
    </BaseCard>
    <Form ref="form" @submit="submit" :validation-schema="schema" v-slot="{ meta }">
        <div class="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            <FormInput name="full_name" label="نام نام خانوادگی" />
            <FormInput name="birth_date" label="تاریخ تولد" type="datepicker" />
            <FormInput name="birth_certificate_number" label="ش.شناسنامه" />
            <FormInput name="national_code" label="کد ملی " />
            <FormInput name="postal_code" label="کد پستی " />
            <FormInput name="marital_status" label="وضعیت تاهل" type="select" :options="statuses" />
            <FormSelectCity :user="user" name="city_id" />
            <FormInput name="address" label="جزئیات آدرس سکونت " />
            <FileImageInput :accept="'image/*'" :mini="false" name="image" label="تصویر پرسنلی" />
        </div>
        <div class="flex items-center gap-3 justify-end mt-4">

            <BaseButton v-if="!isProfile" type="submit" :disabled="!meta.valid || loading">تایید</BaseButton>
            <BaseButton v-else-if="isProfile && isEditable" type="submit" :disabled="loading">تایید
            </BaseButton>
        </div>
    </Form>


</template>

<script setup>
import { Form } from 'vee-validate';
import { number, object, string } from 'yup';
import FormInput from '@/common/components/FormInput.vue';
import FormSelectCity from '@/common/components/FormSelectCity.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import { useRegister } from '@/stores/modules/register';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProfile } from '@/stores/modules/profile';
import { storeToRefs } from 'pinia';
import { useErrors } from '@/composables/useError';
import { size, type } from '@/common/utils/validators';
import FileImageInput from '@/common/components/FileImageInput.vue';
import BaseCard from '@/common/UI/BaseCard.vue';

const register = useRegister();
const store = useProfile();
const route = useRoute();
const form = ref(null);
const { displayError, setFormErrors } = useErrors();
const { push } = useRouter();
const stepIndex = 1;

const registers = computed(() => store.getRegister);
const currentRegister = computed(() => {
    const find = registers.value?.find(r => r.step === stepIndex);
    return find || null;
})

const isEditable = computed(() => {
    const find = registers.value?.find(r => r.step === stepIndex);

    if (!find) return true;

    return find.status !== 'pending' && find.status !== 'accepted';
});

const { user } = storeToRefs(store);

const loading = computed(() => register.getLoading);
const isProfile = computed(() => route.fullPath.includes('panel'));

watch(user, (val) => {
    if (val && form.value && isProfile.value) {
        form.value.resetForm({
            values: { ...val }
        });
    }
}, { immediate: true, deep: true });

const schema = object({
    image: size().concat(type()),
    postal_code: string().required().min(10).max(10),
    full_name: string().required(),
    national_code: string().required().min(10).max(10),
    birth_date: string().required(),
    birth_certificate_number: number().required(),
    marital_status: string().required(),
    address: string().required(),
    city_id: object().required(),
})

const submit = async (values) => {
    try {
        const successful = await register.submitIdentityInfo(values);

        if (isProfile.value) return;

        if (!isProfile.value && successful) {
            store.fetchProfileInfo();
            setTimeout(() => {
                push(window.localStorage.getItem('lastpage') ?? '/');
            }, 2500);
        }

    } catch (error) {
        displayError(error);
        setFormErrors(error, form.value);
    }
}

onMounted(() => {
    if (user.value && form.value && isProfile.value) {
        form.value.resetForm({
            values: { ...user.value }
        });
    } else {
        form.value.resetForm({
            values: {
                referral_code: sessionStorage.getItem('referral_code') || null
            }
        });
    }
})

const statuses = [
    { label: 'مجرد', value: 0 },
    { label: 'متاهل', value: 1 },
]

</script>

<style scoped></style>