<template>
    <h2 class="text-2xl mb-6 text-center font-family-semi-bold">مشخصات جسمانی</h2>

    <BaseCard class="mt-4" v-if="isProfile && currentRegister?.error_note">
        <h6 class="text-sm font-family-semi-bold mb-3">اشکالات و نواقص :</h6>
        <p class="text-sm text-red-600">{{ currentRegister?.error_note }}</p>
    </BaseCard>
    <Form ref="form" @submit="submit" :validation-schema="schema" v-slot="{ meta }">
        <div class="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            <FormInput name="weight" label="وزن" />
            <FormInput name="height" label="قد" />
            <FormInput name="eye_color" label="رنگ چشم" />
            <FormInput name="hair_color" label="رنگ مو" />
            <FormInput name="blood_type" label="گروه خونی" :options="bloods" type="select" />
        </div>
        <p class="text-sm text-neutral-500 font-medium mt-4">تمامی اطلاعات خواسته شده به دستور مراجع قضایی باید بصورت
            کامل توسط کاربر ثبت و تایید شود.</p>

        <div class="flex items-center gap-3 justify-end mt-4">
            <BaseButton v-if="isProfile" to="/panel/identity-docs">مرحله قبلی</BaseButton>
            <BaseButton v-if="!isProfile" to="/register/step/2" type="button" variant="outlined">برگشت</BaseButton>

            <BaseButton v-if="!isProfile" type="submit" :disabled="!meta.valid || loading">تایید</BaseButton>
            <BaseButton v-if="isProfile && isEditable" type="submit" :disabled="loading">تایید
            </BaseButton>
            <BaseButton v-if="isProfile" to="/panel/education-docs">مرحله بعدی</BaseButton>

        </div>
    </Form>

</template>

<script setup>
import { Form } from 'vee-validate';
import { number, object, string } from 'yup';
import FormInput from '@/common/components/FormInput.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRegister } from '@/stores/modules/register';
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
const stepIndex = 3;

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
const physical = computed(() => store.getPhysical);

const schema = object({
    weight: string().required(),
    height: string().required(),
    eye_color: string().required(),
    blood_type: string().required(),
    hair_color: string().required(),
})

watch(physical, (val) => {
    if (val && form.value && isProfile.value) {
        form.value.resetForm({
            values: { ...val }
        });
    }
}, { immediate: true, deep: true });

const submit = async (values) => {
    try {
        const successful = await register.submitPhysicalInfo(values);

        if (isProfile.value) return;

        if (!isProfile.value && successful) {
            push({ name: 'Step4' });
        }

    } catch (error) {
        displayError(error);
        setFormErrors(error, form.value);
    }
}

onMounted(() => {
    if (physical.value && form.value && isProfile.value) {
        form.value.resetForm({
            values: { ...physical.value }
        });
    }
})

const bloods = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
]

</script>

<style scoped></style>
