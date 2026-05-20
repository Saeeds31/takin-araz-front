<template>
    <div class="grid mt-3.5 rounded p-3 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-gray-900">
        <h2 class="font-family-semi-bold text-2xl mb-4 px-2 text-white">رسید ها :</h2>
        <template v-for="(receipt, index) in receipts" :key="index">
            <div class="relative group">

                <div :class="[
                    'rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105',
                    receipt.status == 'pending' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
                        receipt.status == 'rejected' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                            'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                ]">
                    <div class="p-4">
                        <div class="flex flex-col items-center gap-3">
                            <!-- آواتار با کیفیت بهتر -->
                            <div class="relative">
                                <BaseAvatr :size="'lg'" :src="receipt.image"
                                    :active="receipt.status == 'accepted' ? true : false" />
                                <div v-if="receipt.status == 'pending'"
                                    class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse">
                                </div>
                                <div v-else-if="receipt.status == 'rejected'"
                                    class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                <div v-else-if="receipt.status == 'accepted'"
                                    class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>

                            <!-- وضعیت رسید -->
                            <div class="text-center w-full">
                                <h6 class="font-family-semi-bold text-sm mb-1 text-gray-600 dark:text-gray-400">وضعیت
                                    رسید:</h6>
                                <p :class="[
                                    'text-xs font-semibold px-2 py-1 rounded-full inline-block',
                                    receipt.status == 'pending' ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30' :
                                        receipt.status == 'rejected' ? 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30' :
                                            'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                                ]">
                                    {{ receipt.status == 'pending' ? 'در حال بررسی'
                                        : receipt.status == 'rejected' ? 'ردشده' : 'تایید شده' }}
                                </p>
                            </div>

                            <!-- تاریخ ثبت رسید -->
                            <div class="text-center w-full">
                                <h6 class="font-family-semi-bold text-sm mb-1 text-gray-600 dark:text-gray-400">تاریخ
                                    ثبت رسید:</h6>
                                <p class="text-xs text-gray-700 dark:text-gray-300">{{ new
                                    Date(receipt.created_at).toLocaleDateString("fa") }}</p>
                            </div>

                            <!-- مبلغ -->
                            <div class="text-center w-full">
                                <h6 class="font-family-semi-bold text-sm mb-1 text-gray-600 dark:text-gray-400">مبلغ :
                                </h6>
                                <p class="text-xs font-bold text-gray-800 dark:text-white">
                                    {{ Number(receipt.amount).toLocaleString() }} تومان
                                </p>
                            </div>

                            <!-- پیغام کارشناس -->
                            <div class="text-center w-full">
                                <h6 class="font-family-semi-bold text-sm mb-1 text-gray-600 dark:text-gray-400">پیغام
                                    کارشناس :</h6>
                                <p class="text-xs text-gray-500 dark:text-gray-400 italic">{{ receipt.message || "—" }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

<style scoped>
.group:hover {
    transform: translateY(-2px);
}

/* استایل اسکرول برای محتوا */
:deep(.BaseAvatr) {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>