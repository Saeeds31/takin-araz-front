<template>
    <div class="min-h-screen w-full bg-gray-100 dark:bg-gray-900 rounded transition-colors duration-300">
        <!-- هدر با دکمه تغییر تم -->
        <header class="bg-white dark:bg-gray-800 shadow-md rounded">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
                    پروفایل کاربر
                </h1>

            </div>
        </header>

        <div class="container mx-auto px-4 py-8" v-if="loading">
            <BaseLoading />
            <div class="flex justify-center items-center h-64">
                <div class="text-gray-600 dark:text-gray-300">در حال بارگذاری...</div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8 rounded" v-else-if="user">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- سمت راست - تصویر پروفایل و اطلاعات پایه -->
                <div class="lg:col-span-1">
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div class="p-6 text-center">
                            <!-- تصویر پروفایل -->
                            <div class="relative inline-block">
                                <img :src="$filters.resource(user.image)" alt="پروفایل"
                                    class="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 object-cover" />
                                <button @click="openImageModal"
                                    class="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 transition">
                                    📷
                                </button>
                            </div>

                            <h2 class="text-xl font-bold mt-4 text-gray-800 dark:text-white">
                                {{ user.full_name }}
                            </h2>
                            <p class="text-gray-600 dark:text-gray-400 mt-1">
                                {{ user.mobile }}
                            </p>

                            <!-- موجودی کیف پول -->
                            <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <p class="text-sm text-gray-600 dark:text-gray-400">موجودی کیف پول</p>
                                <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {{ Number(user.wallet?.balance || 0).toLocaleString('fa') }} تومان
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- سمت چپ - اطلاعات کامل -->
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
                                اطلاعات شخصی
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- کد ملی -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">کد ملی</label>
                                    <p class="text-gray-800 dark:text-white font-medium">{{ user.national_code }}
                                    </p>
                                </div>

                                <!-- تاریخ تولد -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">تاریخ تولد</label>
                                    <p class="text-gray-800 dark:text-white font-medium">{{
                                        new Date(user.birth_date).toLocaleDateString('fa') }}</p>
                                </div>

                                <!-- شماره شناسنامه -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">شماره شناسنامه</label>
                                    <p class="text-gray-800 dark:text-white font-medium">{{
                                        user.birth_certificate_number }}</p>
                                </div>

                                <!-- وضعیت تاهل -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">وضعیت تاهل</label>
                                    <p class="text-gray-800 dark:text-white font-medium">
                                        {{ user.marital_status === 1 ? 'متاهل' : 'مجرد' }}
                                    </p>
                                </div>

                                <!-- استان و شهر -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">شهر</label>
                                    <p class="text-gray-800 dark:text-white font-medium">
                                        {{ user.city?.name || 'نامشخص' }}
                                    </p>
                                </div>

                                <!-- کد پستی -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">کد پستی</label>
                                    <p class="text-gray-800 dark:text-white font-medium">{{ user.postal_code }}</p>
                                </div>

                                <!-- آدرس -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg  md:col-span-2">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">آدرس</label>
                                    <p class="text-gray-800 dark:text-white font-medium">{{ user.address }}</p>
                                </div>

                                <!-- تاریخ عضویت -->
                                <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ">
                                    <label class="text-sm text-gray-500 dark:text-gray-400">تاریخ عضویت</label>
                                    <p class="text-gray-800 dark:text-white font-medium">{{
                                        new Date(user.created_at).toLocaleDateString('fa') }}

                                    </p>
                                </div>
                            </div>

                            <!-- دکمه‌های اقدام -->
                            <div class="mt-6 flex gap-3">
                                <button @click="openEditModal"
                                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    ویرایش اطلاعات
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8" v-else>
            <div class="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg text-center">
                خطا در دریافت اطلاعات کاربر
            </div>
        </div>

        <!-- مودال ویرایش اطلاعات -->
        <ModalEditUser :is-open="showEditModal" :user="user" @close="showEditModal = false" @save="handleSaveUser" />

        <!-- مودال تغییر تصویر پروفایل -->
        <ModalImageUpload :is-open="showImageModal" :user="user" @close="showImageModal = false"
            @save="handleImageUpload" />
    </div>
</template>

<script setup>
import BaseLoading from '@/common/UI/BaseLoading.vue';
import ModalEditUser from '@/components/panel/ModalEditUser.vue';
import ModalImageUpload from '@/components/panel/modalImageUpload.vue';
import { useProfile } from '@/stores/modules/profile';
import { onMounted, computed, ref } from 'vue';
import { useHead } from '@vueuse/head'

const store = useProfile();
const showEditModal = ref(false);
const showImageModal = ref(false);

let loading = computed(() => {
    return store.getLoading;
})
let user = computed(() => {
    return store.getUser;
})

const openEditModal = () => {
    showEditModal.value = true;
}

const openImageModal = () => {
    showImageModal.value = true;
}

const handleSaveUser = async (updatedData) => {
    try {
        await store.updateProfile(updatedData);
        showEditModal.value = false;
    } catch (error) {
        console.error('خطا در ویرایش اطلاعات:', error);
    }
}

const handleImageUpload = async (imageFile) => {
    try {
        await store.updateProfileImage(imageFile);
        showImageModal.value = false;
    } catch (error) {
        console.error('خطا در آپلود تصویر:', error);
    }
}



// بررسی تم ذخیره شده


onMounted(async () => {
    await store.fetchProfileInfo();
});
useHead({
    title: "پنل کابری | تاپ کار",
    meta: [
        {
            name: 'description',
            content: "پنل کاربری مربوط به مشتریان سایت تاپ کار"
        },
        {
            property: 'og:title',
            content: "پنل کابری | تاپ کار"
        },
        {
            property: 'og:description',
            content: "پنل کاربری مربوط به مشتریان سایت تاپ کار"
        },

    ],
    link: [
        {
            rel: 'canonical',
            href: `https://tap-car.ir/user-panel`
        }
    ],

})
</script>

<style scoped>
body {
    direction: rtl;
    font-family: 'Vazir', 'Tahoma', sans-serif;
}
</style>