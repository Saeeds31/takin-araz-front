<template>
    <form @submit.prevent="submit">
        <div class="mb-4 flex items-center gap-4">
            <span class="text-sm font-family-semi-bold">ثبت فیش واریزی:</span>
        </div>
        <BaseCard variant="filled" mode="success" class="mb-4">
            <h6 class="font-semibold text-md mb-2">شماره کارت به نام موسسه بین المللی تکین آرتا پرگاس :</h6>
            <div class="flex items-stretch flex-wrap gap-3">
                <span
                    class="border-2 border-gray-500 border-dashed rounded-sm flex items-center py-3 text-gray-700 text-sm font-family-semi-bold w-full px-4 md:px-20 md:w-auto select-none">
                    6037-6919-9036-3566
                </span>
                <BaseButton @click="clipboard">کپی شماره کارت</BaseButton>
            </div>
        </BaseCard>
        <BaseCard class="mb-4">
            <h6 class="text-sm font-family-semi-bold mb-2">مبلغ واریز شده به تومان :
                <span class=" text-blue-500">{{ receipt.amount ? Number(receipt.amount).toLocaleString('fa') : "" }}</span>
            </h6>
            <input v-model="receipt.amount" type="tel" class="w-full px-2 py-1 outline-0">
        </BaseCard>

        <BaseCard class="mb-4">
            <h6 class="text-sm font-family-semi-bold mb-2">تصویر فیش واریزی:</h6>
            <FileUpload v-model="receipt.image" :multi="true" />
        </BaseCard>

        <div class="flex justify-end mb-4">
            <BaseButton :disabled="loading" type="submit">ارسال فیش</BaseButton>
        </div>
    </form>
</template>

<script setup>
import FileUpload from '@/common/components/FileUpload.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseRadioGroup from '@/common/UI/BaseRadioGroup.vue';
import { isEmpty } from '@/common/utils/helpers';
import { useErrors } from '@/composables/useError';
import { useReceipt } from '@/stores/modules/receipt';
import { toast } from 'vue3-toastify';
import { computed, onMounted, reactive, ref } from 'vue'
import { number } from 'yup';

const store = useReceipt();
const { displayError } = useErrors();

const loading = computed(() => store.loading);

const receipt = reactive({
    amount: null,
    image: [],
});
const clipboard = async () => {
    await navigator.clipboard.writeText('6037691990363566');

    toast.info('َشماره کارت با موفقیت کپی شد');
}
const submit = async () => {
    if (isEmpty(receipt)) return;

    try {
        const fd = new FormData();
        for (const key in receipt) {
            fd.append(key, key == 'image' ? receipt[key][0] : receipt[key]);
        }
        await store.send(fd);
    } catch (error) {
        displayError(error);
    }
}
</script>

<style scoped></style>