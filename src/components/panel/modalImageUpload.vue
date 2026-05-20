<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
    >
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
            <div class="flex justify-between items-center p-6 border-b dark:border-gray-700">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                    تغییر تصویر پروفایل
                </h3>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6">
                <div class="text-center">
                    <img
                        v-if="previewImage"
                        :src="previewImage"
                        class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <div v-else class="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span class="text-4xl">📷</span>
                    </div>
                    
                    <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        @change="handleFileSelect"
                        class="hidden"
                    />
                    
                    <button
                        type="button"
                        @click="$refs.fileInput.click()"
                        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        انتخاب تصویر
                    </button>
                </div>

                <div class="flex gap-3 justify-end mt-6 pt-4 border-t dark:border-gray-700">
                    <button
                        @click="closeModal"
                        class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg"
                    >
                        انصراف
                    </button>
                    <button
                        @click="uploadImage"
                        :disabled="!selectedFile || uploading"
                        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        {{ uploading ? 'در حال آپلود...' : 'آپلود تصویر' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    user: Object
});

const emit = defineEmits(['close', 'save']);

const fileInput = ref(null);
const selectedFile = ref(null);
const previewImage = ref(null);
const uploading = ref(false);

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const uploadImage = async () => {
    if (!selectedFile.value) return;
    
    uploading.value = true;
    try {
        await emit('save', selectedFile.value);
        closeModal();
    } finally {
        uploading.value = false;
    }
};

const closeModal = () => {
    selectedFile.value = null;
    previewImage.value = null;
    emit('close');
};
</script>