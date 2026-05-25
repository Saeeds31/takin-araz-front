<template>
    <div class="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <!-- هدر با افکت شیشه‌ای -->
        <header
            class="sticky top-0 z-20 backdrop-blur-lg bg-white/10 dark:bg-black/30 border-b border-white/10 shadow-xl">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                            </path>
                        </svg>
                    </div>
                    <h1
                        class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        درخواست‌های ثبت‌نام خودرو
                    </h1>
                </div>

            </div>
        </header>

        <!-- محتوا -->
        <div class="container mx-auto px-4 py-8">
            <!-- لودینگ پیشرفته -->
            <div v-if="loading" class="flex justify-center items-center h-96">
                <div class="text-center">
                    <div class="relative">
                        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div
                                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse">
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-400 mt-4">در حال بارگذاری درخواست‌ها...</p>
                </div>
            </div>

            <!-- خطا -->
            <div v-else-if="error"
                class="bg-red-500/10 backdrop-blur-sm border border-red-500/50 text-red-400 p-4 rounded-xl text-center">
                <svg class="w-6 h-6 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ error }}
            </div>

            <!-- لیست درخواست‌ها -->
            <div v-else-if="requests.length > 0" class="space-y-6">
                <!-- کارت هر درخواست با افکت hover -->
                <div v-for="request in requests" :key="request.id"
                    class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/10">
                    <!-- گرادیانت روی کارت -->
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500">
                    </div>

                    <div class="flex flex-col lg:flex-row relative z-10">
                        <!-- بخش تصویر خودرو -->
                        <div class="lg:w-1/3 xl:w-1/4 relative overflow-hidden">
                            <img :src="$filters.resource(request.car?.image)" :alt="request.car?.name"
                                class="w-full h-56 lg:h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent lg:bg-gradient-to-r">
                            </div>
                        </div>

                        <!-- اطلاعات درخواست -->
                        <div class="flex-1 p-6">
                            <div
                                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                                <h2
                                    class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                    {{ request.car?.name || 'خودرو نامشخص' }}
                                </h2>
                                <span :class="getStatusClass(request.status)"
                                    class="px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                    {{ getStatusText(request.status) }}
                                </span>
                            </div>

                            <!-- اطلاعات به صورت گرید -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div class="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                    <span class="text-2xl">💰</span>
                                    <div>
                                        <p class="text-xs text-gray-400">قیمت</p>
                                        <p class="text-white font-semibold">
                                            {{ Number(request.price).toLocaleString('fa') }} دلار
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                    <span class="text-2xl">📅</span>
                                    <div>
                                        <p class="text-xs text-gray-400">تاریخ ثبت</p>
                                        <p class="text-white">{{ formatDate(request.created_at) }}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                    <span class="text-2xl">🔄</span>
                                    <div>
                                        <p class="text-xs text-gray-400">آخرین بروزرسانی</p>
                                        <p class="text-white">{{ formatDate(request.updated_at) }}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                    <span class="text-2xl">📋</span>
                                    <div>
                                        <p class="text-xs text-gray-400">طرح فروش</p>
                                        <p class="text-white">{{ request.sale_plan?.title || 'نامشخص' }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- تاریخچه فیش‌های واریزی -->
                            <div v-if="request.receipts && request.receipts.length > 0" class="mb-4">
                                <button @click="toggleReceipts(request.id)"
                                    class="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition">
                                    <svg class="w-4 h-4"
                                        :class="{ 'rotate-180': expandedReceipts.includes(request.id) }" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                    فیش‌های واریزی ({{ request.receipts.length }})
                                </button>
                                <div v-if="expandedReceipts.includes(request.id)" class="mt-2 space-y-2">
                                    <div v-for="receipt in request.receipts" :key="receipt.id"
                                        class="p-2 rounded-lg bg-white/5 text-sm">
                                        <div class="flex justify-between items-center">
                                            <span>مبلغ: {{ Number(receipt.amount).toLocaleString('fa') }} تومان</span>
                                            <span
                                                :class="receipt.status === 'approved' ? 'text-green-400' : receipt.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'">
                                                {{ receipt.status === 'approved' ? 'تایید شده' : receipt.status ===
                                                    'rejected' ? 'رد شده' : 'در انتظار تایید' }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- دکمه‌های اقدام -->
                            <div class="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                                <button @click="uploadReceipt(request)"
                                    class="px-4 py-2 bg-white text-shadow-primary-darker rounded-xl  transition-all duration-300 shadow-lg hover:shadow-xl">
                                    ثبت فیش واریزی
                                </button>
                                <button 
                                    class="px-4 py-2 bg-amber-300 text-black-400 border border-amber-500/50 rounded-xl  transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <router-link :to="`/user-panel/invoice/${request.id}`">
                                        دریافت فاکتور
                                    </router-link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- حالت خالی -->
            <div v-else class="text-center py-20 flex flex-col items-center">
                <h3 class="text-xl font-semibold text-white mb-2">هیچ درخواستی یافت نشد</h3>
                <p class="text-gray-400">شما تاکنون هیچ درخواست ثبت‌نام خودرویی نداشته‌اید</p>
                <router-link to="/cars"
                    class="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition">
                    ثبت درخواست جدید
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useErrors } from '@/composables/useError';
import { useRequest } from '@/stores/modules/requests';
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from "vue-router"
const store = useRequest();
const router = useRouter();
const { displayError } = useErrors();

const loading = ref(true);
const error = ref(null);
const expandedReceipts = ref([]);


const requests = computed(() => store.getRequests);


// فرمت تاریخ
const formatDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    return new Date(dateString).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// وضعیت‌های درخواست
const getStatusClass = (status) => {
    'pending', 'pre_registration', 'invitation_to_attend', 'delivered'

    const classes = {
        'pending': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
        'pre_registration': 'bg-green-500/20 text-green-400 border border-green-500/50',
        'invitation_to_attend': 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
        'delivered': 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
    };
    return classes[status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/50';
};

const getStatusText = (status) => {
    const texts = {
        'pending': 'در انتظار بررسی',
        'pre_registration': 'پیش ثبت نام',
        'invitation_to_attend': 'دعوت به حضور',
        'delivered': 'تحویل داده شده',
    };
    return texts[status] || status;
};



const uploadReceipt = (request) => {
    router.push(`/user-panel/receipts?request_id=${request.id}`)
};

const toggleReceipts = (requestId) => {
    if (expandedReceipts.value.includes(requestId)) {
        expandedReceipts.value = expandedReceipts.value.filter(id => id !== requestId);
    } else {
        expandedReceipts.value.push(requestId);
    }
};


// بارگذاری داده‌ها
const init = async () => {
    try {
        loading.value = true;
        error.value = null;
        await store.load();
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
</script>

<style scoped>
/* اسکرول بار سفارشی */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.8);
}
</style>