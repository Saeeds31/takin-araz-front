<template>
    <h6 class="font-family-semi-bold text-sm mb-2 px-2">رسید ها :</h6>
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <template v-for="(receipt, index) in receipts" :key="index">
            <BaseCard variant="filled"
                :mode="receipt.status == 'pending' ? 'primary' : receipt.status == 'rejected' ? 'danger' : 'success'"
                class="mb-4">
                <div class="flex flex-col items-center gap-4">
                    <BaseAvatr :size="'lg'" :src="receipt.image" :active="receipt.status == 'accepted'?true:false" />

                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">وضعیت رسید:</h6>
                        <p class="text-xs">{{ receipt.status == 'pending' ? 'در حال بررسی' : receipt.status ==
                            'rejected' ?
                            'رد شده' : 'تایید شده' }}</p>
                    </div>
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">تاریخ ثبت رسید:</h6>
                        <p class="text-xs">{{ new Date(receipt.created_at).toLocaleDateString("fa") }}</p>
                    </div>
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">مبلغ :
                        </h6>
                        <p class="text-xs">
                            {{ Number(receipt.amount).toLocaleString() }} تومان
                        </p>
                    </div>
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">
                            پیغام ادمین :
                        </h6>
                        <p class="text-xs">{{ " - " }}</p>
                    </div>
                </div>
            </BaseCard>
        </template>
    </div>
</template>

<script setup>
import BaseAvatr from '@/common/UI/BaseAvatr.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import { useErrors } from '@/composables/useError';
import { useReceipt } from '@/stores/modules/receipt';
import { computed, onMounted, ref } from 'vue'

const store = useReceipt();
const { displayError } = useErrors();

const receipts = computed(() => store.receipts);

const init = async () => {
    try {
        await store.load();
    } catch (error) {
        displayError(error);
    }
}

onMounted(async () => {
    await init();
});
</script>

<style scoped></style>