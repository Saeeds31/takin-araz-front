<template>
    <h2 class="text-2xl mb-6 text-center font-family-semi-bold">مدارک هویتی</h2>
    <BaseCard class="mt-4 mb-8" mode="primary" v-if="isProfile && currentRegister && currentRegister.status == 'rejected'">
        <h6 class="text-sm font-family-semi-bold mb-3">اشکالات و نواقص :</h6>
        <p class="text-sm text-red-600">{{ currentRegister?.error_note }}</p>
    </BaseCard>
    <Form ref="form" @submit="submit" :validation-schema="schema" v-slot="{ meta }">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FileImageInput label="کارت ملی" name="national_code" />
            <FileImageInput label="ص.اول شناسنامه" name="birth_certificate_first_page" />
            <FileImageInput label="ص.دوم شناسنامه" name="birth_certificate_second_page" />
            <FileImageInput label="کارت پایان خدمت" name="end_of_service" />
            <FileImageInput label="عدم سو پیشینه" name="no_criminal_record" />
            <FileImageInput label="گواهی عدم اعتیاد" name="non_addiction" />
            <FileImageInput label="گواهی سلامت" name="health_certificate" />
            <FileImageInput label="معافیت تحصیلی" name="educational_exemption" />
        </div>
    
        <p class="text-sm text-neutral-500 font-medium mt-4">تمامی اطلاعات خواسته شده به دستور مراجع قضایی باید بصورت کامل توسط کاربر ثبت و تایید شود.</p>
    
        <div class="flex items-center gap-3 justify-end mt-4">
            <BaseButton v-if="isProfile" to="/panel/identity-info">مرحله قبلی</BaseButton>
            <BaseButton v-if="!isProfile" to="/register/step/1" type="button" variant="outlined">برگشت</BaseButton>
            <BaseButton v-if="!isProfile" type="submit" :disabled="!meta.valid || loading">تایید</BaseButton>
            <BaseButton v-if="isProfile && isEditable" type="submit" :disabled="loading">تایید</BaseButton>
            <BaseButton v-if="isProfile"  to="/panel/physical-info">مرحله بعدی</BaseButton>

        </div>
    </Form>

    
</template>

<script setup>
import { object } from 'yup';
import FileImageInput from '@/common/components/FileImageInput.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import { Form } from 'vee-validate';
import { useRegister } from '@/stores/modules/register';
import { computed, onMounted, ref, watch } from 'vue';
import { size, type } from '@/common/utils/validators.js';
import { useProfile } from '@/stores/modules/profile';
import { useRoute, useRouter } from 'vue-router';
import { useErrors } from '@/composables/useError';
import BaseCard from '@/common/UI/BaseCard.vue';

const register = useRegister();
const store = useProfile();
const route = useRoute();
const form = ref(null);
const { displayError, setFormErrors } = useErrors();
const { push } = useRouter();
const stepIndex = 2;

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

const loading = computed(() => register.getLoading);
const isProfile = computed(() => route.fullPath.includes('panel'));
const identity = computed(() => store.getIdentity);

const schema = object({
    national_code: size().concat(type()),
    birth_certificate_first_page:  size().concat(type()),
    birth_certificate_second_page: size().concat(type()),
    end_of_service: size().concat(type()),
    no_criminal_record:size().concat(type()),
    non_addiction: size().concat(type()),
    health_certificate: size().concat(type()),
    educational_exemption: size().concat(type()),
});

watch(identity, (val) => {
    if (val && form.value && isProfile.value) {
        form.value.resetForm({
            values: { ...val }
        });
    }
}, {immediate: true, deep: true});

const submit = async (values) => {
    try {
        const successful = await register.submitIdentityDocs(values);

        if (isProfile.value) return;

        if (!isProfile.value && successful) {
            push({ name: 'Step3' });
        }

    } catch (error) {
        displayError(error);
        setFormErrors(error, form.value);
    }
}

onMounted(() => {
    if (identity.value && form.value && isProfile.value) {
        form.value.resetForm({
            values: { ...identity.value }
        });
    }
})
 
</script>

<style scoped></style>