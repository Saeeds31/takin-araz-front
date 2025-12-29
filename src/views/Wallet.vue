<template>
    <div class="grid grid-col-1 md:grid-cols-2 gap-4">
        <BaseCard class="relative custom-bg-01" variant="outlined">
            <div class="h-96 relative overflow-y-auto hide-scroll">
                <div class="flex items-center justify-between mb-6">
                    <h6 class="text-lg ">کیف پول</h6>

                    <!-- <BaseButton @click="show = true">شارژ حساب</BaseButton> -->
                </div>
    
                <div class="flex items-center justify-center gap-2">
                    <span class="text-lg">موجودی</span>
                    <span class="font-bold text-4xl">{{ $filters.price(balance) }}</span>
                    <span class="text-sm">تومان</span>
                </div>
            </div>
        </BaseCard>
        <BaseCard class="relative custom-bg-02" variant="outlined">
            <div class="h-96 relative overflow-y-auto hide-scroll">
                <div class="flex items-center justify-between mb-6">
                    <h6 class="text-lg ">پرداختی و گزارش ها</h6>
                </div>
    
                <div v-if="transactions?.length" v-for="(transaction, index) in transactions" :key="index">
                    <div class="border-neutral-100 pb-1 mt-2" :class="{ 'border-b': index !== transactions.length - 1 }">
                        <p class="mb-1 text-md font-family-regular text-indigo-400">{{ transaction?.description }}</p>
                        <div class="flex items-center justify-between">
                            <p class="text-xl">{{ $filters.price(transaction?.amount) }} <span class="text-xs ms-1">تومان</span></p>
                            <span class="text-md font-family-semi-bold text-emerald-500">نامشخص</span>
                        </div>
                    </div>
                </div>
                <div v-else class="text-sm text-center">تراکنشی یافت نشد</div>
            </div>
        </BaseCard>
    </div>

    <BaseModal v-model="show">
        <div class="flex items-center justify-between mb-4">
            <h6 class="font-family-semi-bold text-xl">افزایش اعتبار</h6>
            <BaseIconButton :is-hover="true" @click="show = false">
                <IconClose />
            </BaseIconButton>
        </div>

        <Form ref="form" @submit="submit" :validation-schema="schema" v-slot="{ meta }">
            <FormInput type="number" label="مبلغ اعتبار" dir="ltr" name="amount" />
            <BaseButton class="w-full" type="submit" :disabled="!meta.valid || isRedirect">
                <span v-if="isRedirect">در حال پرداخت </span>
                <span v-else>پرداخت </span>
            </BaseButton>
        </Form>
    </BaseModal>
</template>

<script setup>
import FormInput from '@/common/components/FormInput.vue';
import IconClose from '@/common/icons/IconClose.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseIconButton from '@/common/UI/BaseIconButton.vue';
import BaseModal from '@/common/UI/BaseModal.vue';
import { useErrors } from '@/composables/useError';
import { useWallet } from '@/stores/modules/wallet';
import { Form } from 'vee-validate';
import { computed, onMounted, ref } from 'vue'
import { number, object } from 'yup';

const store = useWallet();

const loading = computed(() => store.getLoading);
const balance = computed(() => store.getBalance);
const transactions = computed(() => store.getTransactions);

const { displayError } = useErrors();

const show = ref(false);
const isRedirect = ref(false);

const schema = object({
    amount: number().required().min(0)
});

const submit = async (values) => {
    if (!values || !values.amount) return;

    isRedirect.value = true;
    try {
        const response = await store.increaseWalletAmount(values.amount);
        show.value = false;
    } catch (error) {
        displayError(error);
    } finally {
        isRedirect.value = false;
    }
}

onMounted(async () => {
    await store.walletDetail();
})

</script>

<style scoped>
.custom-bg-01::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/src/assets/images/wallet-01.png');
    background-repeat: no-repeat;
    background-position: 50% 80%;
    background-size: 210px 200px;
    opacity: 0.6;
}
.custom-bg-02::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/src/assets/images/wallet-02.png');
    background-repeat: no-repeat;
    background-position: 50% 80%;
    background-size: 210px 200px;
    opacity: 0.6;
}
</style>