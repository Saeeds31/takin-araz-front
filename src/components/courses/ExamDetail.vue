<template>
    <div>
        <h4 class="font-family-semi-bold text-lg mb-4">جزئیات آزمون</h4>
        <div class="flex items-center gap-2 mb-2">
            <span class="text-sm font-family-semi-bold">نام آزمون :</span>
            <span class="text-sm">آزمون شماره یک</span>
        </div>
        <div class="flex items-center gap-2 mb-2">
            <span class="text-sm font-family-semi-bold">تعداد سوالات :</span>
            <span class="text-sm">30</span>
        </div>

        <BaseCard>
            <h6 class="font-semibold text-md mb-2">توجه</h6>
            <p class="text-neutral-500 text-sm text-justify leading-6">شما در آزمون نوبت اول نمره کافی برای قبولی را کسب نکرده اید برای ادامه باید مجددا در آزمون ثبت نام کنید </p>

            <ul class="mt-4">
                <BaseAccordion :is-expand="true">
                    <template #header>
                        <span class="text-neutral-600 text-sm text-justify leading-6">به منظور پرداخت کامل هزینه، اینجا کلیک کنید</span>
                    </template>
                    <template #submenu>
                        <Form @submit="submit" :validation-schema="schema" v-slot="{ meta }">
                            <FormInput type="number" dir="ltr" name="amount" hint="لطفا مبلغ پرداختی را به ریال وارد کنید" placeholder="0,0000,0000" />
                            <BaseButton type="submit" :disabled="!meta.valid || loading">پرداخت </BaseButton>
                        </Form>
                    </template>
                </BaseAccordion>
    
                <BaseAccordion :is-expand="true">
                    <template #header>
                        <span class="text-neutral-600 text-sm text-justify leading-6">به منظور پرداخت اقساطی هزینه، اینجا کلیک کنید</span>
                    </template>
                    <template #submenu>
                        <p class="text-neutral-500 text-sm text-justify leading-6">لطفا یکی از مبالغ زیر را جهت پرداخت اولین قسط انتخاب کنید</p>
                            <div class="flex items-center gap-4 mt-3">
                                <BaseButton variant="outlined">
                                    <span class="text-sm">تومان</span>
                                    {{ $filters.price(200000) }}
                                </BaseButton>
                                <BaseButton variant="outlined">
                                    <span class="text-sm">تومان</span>
                                    {{ $filters.price(500000) }}
                                </BaseButton>
                                <BaseButton variant="outlined">
                                    <span class="text-sm">تومان</span>
                                    {{ $filters.price(800000) }}
                                </BaseButton>
                            </div>
                    </template>
                </BaseAccordion>
            </ul>
        </BaseCard>
    </div>
</template>

<script setup>
import FormInput from '@/common/components/FormInput.vue';
import BaseAccordion from '@/common/UI/BaseAccordion.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseModal from '@/common/UI/BaseModal.vue';
import { Form } from 'vee-validate';
import { ref } from 'vue'
import { number, object } from 'yup';

const schema = object({
    amount: number().required().min(0)
});
</script>

<style scoped></style>