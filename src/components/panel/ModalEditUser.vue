<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="closeModal">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div class="flex justify-between items-center p-6 border-b dark:border-gray-700">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                    ویرایش اطلاعات کاربر
                </h3>
                <button @click="closeModal"
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form @submit.prevent="submitForm" id="userEditForm" class="p-6">
                <div class="flex md:grid md:grid-cols-[1fr_1fr] flex-col  gap-4">

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            نام کامل
                        </label>
                        <input v-model="formData.full_name" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                    </div>



                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            کد ملی
                        </label>
                        <input v-model="formData.national_code" type="text" required dir="ltr"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            تاریخ تولد
                        </label>

                        <date-picker v-model="formData.birth_date" format="YYYY/MM/DD" display-format="jYYYY/jMM/jDD" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            شماره شناسنامه
                        </label>
                        <input v-model="formData.birth_certificate_number" type="text"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            وضعیت تاهل
                        </label>
                        <select v-model="formData.marital_status"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option :value="0">مجرد</option>
                            <option :value="1">متاهل</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            کد پستی
                        </label>
                        <input v-model="formData.postal_code" type="text" dir="ltr"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                    </div>

                    <FormSelectCity @selectedCity="(e) => formData.city_id = e" :user="props.user" name="city_id" />

                    <div class="col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            آدرس
                        </label>
                        <textarea v-model="formData.address" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
                    </div>

                </div>

                <div class="flex gap-3 justify-end mt-6 pt-4 border-t dark:border-gray-700">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                        انصراف
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
                        {{ loading ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import FormSelectCity from '@/common/components/FormSelectCity.vue';

const props = defineProps({
    isOpen: Boolean,
    user: Object
});

const emit = defineEmits(['close', 'save']);

const loading = ref(false);
const formData = ref({
    full_name: '',
    national_code: '',
    birth_date: '',
    birth_certificate_number: '',
    marital_status: 0,
    address: '',
    postal_code: '',
    city_id: 1
});

watch(() => props.isOpen, (newVal) => {
    if (newVal && props.user) {
        formData.value = {
            full_name: props.user.full_name || '',
            mobile: props.user.mobile || '',
            national_code: props.user.national_code || '',
            birth_date: props.user.birth_date ? props.user.birth_date.split('T')[0] : '',
            birth_certificate_number: props.user.birth_certificate_number || '',
            marital_status: props.user.marital_status || 0,
            address: props.user.address || '',
            postal_code: props.user.postal_code || '',
            city_id: props.user.city_id || 1
        };
    }
});

const closeModal = () => {
    emit('close');
};

const submitForm = async () => {
    loading.value = true;
    const fd = new FormData();
    for (const key in formData.value) {
        fd.append(key, formData.value[key])
    }
    try {
        await emit('save', fd);
        closeModal();
    } finally {
        loading.value = false;
    }
};
</script>
<style>
.vpd-main .form-control {
    color: white
}

#userEditForm .label {
    top: -26px;
    right: 0;
    background: unset;
    color: white;
}

#userEditForm .boxInput {
    color: white;
    margin-top: 20px;
    border: 1px solid #4a5565;
}

#userEditForm .multiselect__tags {
    background: #364153;
}

#userEditForm span.multiselect__single {
    background: #364153;
    color: white;
}
</style>