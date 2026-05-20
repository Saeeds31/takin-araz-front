<template>

    <form @submit.prevent="submit" class="bg-gray-900 text-white rounded-xl shadow-lg p-6">
        <!-- هدر فرم -->
        <div class="mb-6 pb-3 border-b border-gray-200">
            <span class="text-lg font-bold text-white">ثبت فیش واریزی</span>
        </div>

        <!-- شماره شبا -->
        <div class="mb-6">
            <h6 class="font-semibold text-md text-gray-50 mb-3">شماره شبای شرکت تکین آراز پرگاس:</h6>
            <div class="flex items-stretch flex-wrap gap-3">
                <span
                    class="border-2 border-gray-400 border-dashed rounded-lg flex items-center py-3 text-gray-700 text-sm font-mono font-semibold w-full px-4 md:px-8 md:w-auto select-none bg-gray-50"
                    dir="ltr">
                    IR-500-190-000000-22225-36440-07
                </span>
                <BaseButton @click="clipboard" class="hover:bg-gray-100 transition">
                    کپی شماره شبا
                </BaseButton>
            </div>
        </div>

        <!-- مبلغ واریز شده -->
        <div v-if="route.query.request_id" class="mb-6">
            <h6 class="text-sm font-semibold text-gray-50 mb-2">
                خودروی درخواست شده:
            </h6>
            <div v-if="requests.length" class="relative">
                <input disabled :value="requests.find(r => r.id = route.query.request_id)?.car?.name" type="tel"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    dir="rtl" />
            </div>
        </div>
        <div v-else id="sendReceipt" class="else">
            <h6 class="text-sm font-semibold text-gray-50 mb-2">
                انتخاب خودروی درخواست شده:
            </h6>
            <div v-if="requests.length" class="relative">
                <Multiselect trackBy="id" label="name" v-model="selectedRequest" :options="requests"
                    :allow-empty="false" :searchable="false" :placeholder="placeholder" :select-label="''"
                    :deselect-label="''" :selected-label="'انتخاب شده'">
                </Multiselect>
            </div>
        </div>

        <div class="mb-6">
            <h6 class="text-sm font-semibold text-gray-50 mb-2">
                مبلغ واریز شده به تومان :
                <span class="text-white text-lg font-bold">
                    {{ receipt.amount ? Number(receipt.amount).toLocaleString('fa') : "۰" }}
                </span>
            </h6>
            <div class="relative">
                <input v-model="receipt.amount" type="tel" placeholder="مبلغ را وارد کنید..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    dir="rtl" />
                <span class="absolute left-3 top-2 text-gray-400 text-sm">تومان</span>
            </div>
        </div>

        <!-- تصویر فیش واریزی -->
        <div class="mb-6">
            <h6 class="text-sm font-semibold text-gray-50 mb-2">تصویر فیش واریزی:</h6>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition">
                <FileUpload v-model="receipt.image" :multi="true" />
            </div>
        </div>

        <!-- دکمه ارسال -->
        <div class="flex justify-end pt-2">
            <BaseButton :disabled="loading" type="submit"
                class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="loading">در حال ارسال...</span>
                <span v-else>ارسال فیش</span>
            </BaseButton>
        </div>
    </form>
</template>

<script setup>
import FileUpload from '@/common/components/FileUpload.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import { isEmpty } from '@/common/utils/helpers';
import { useRequest } from '@/stores/modules/requests';
import Multiselect from 'vue-multiselect';
import { useErrors } from '@/composables/useError';
import { useReceipt } from '@/stores/modules/receipt';
import { toast } from 'vue3-toastify';
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useReceipt();
const store1 = useRequest();
const { displayError } = useErrors();
let selectedRequest = ref(null)
const loading = computed(() => store.loading);
const requests = computed(() => {
    return store1.getRequests.map((item) => {
        return { id: item.id, name: item.car.name }
    })
});
const receipt = reactive({
    amount: null,
    image: [],
});
const clipboard = async () => {
    await navigator.clipboard.writeText('IR500190000000222253644007');

    toast.info('َشماره شبا با موفقیت کپی شد');
}
const init = async () => {
    try {
        loading.value = true;
        await store1.load();
    } catch (err) {
        error.value = err.message || 'خطا در دریافت اطلاعات';
        displayError(err);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await init();
});
const submit = async () => {
    if (!route.query.request_id && !selectedRequest.value) {
        return toast.error('خوردو مد نظر را وارد کنید')
    }

    if (!receipt.amount) {
        return toast.error('لطفا مبلغ مد نظر را با دقت وارد کنید')
    };

    if (!receipt.image.length) {
        return toast.error('لطفا تصویر رسید مد نظر را با دقت انتخاب کنید')
    };

    try {
        const fd = new FormData();
        for (const key in receipt) {
            fd.append(key, key == 'image' ? receipt[key][0] : receipt[key]);
        }
        fd.append('request_id', route.query.request_id ?? selectedRequest.value.id)
        await store.send(fd);
        await store.load();
    } catch (error) {
        displayError(error);
    }
}
</script>

<style>
#sendReceipt .multiselect__tags {
    background: #364153;
}

#sendReceipt span.multiselect__single {
    background: #364153;
    color: white;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
