<template>
    <div class="w-full max-w-lg mx-auto">
        <div
            class="border-2 border-dashed rounded-md p-6 text-center transition-all cursor-pointer"
            :class="[
                isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300',
                errors.length ? 'border-red-500' : ''
            ]"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="onDrop"
            @click="trigger"
        >
            <p class="text-gray-600 mb-2">فایل‌ها را اینجا بکشید و رها کنید یا برای آپلود کلیک کنید</p>
            <p class="text-sm text-gray-400 word-tracking-wider">
                مجاز: {{ accepted.join(', ') }} | حداکثر اندازه: {{ maxSizeMB }}MB
            </p>

            <input
                ref="fileInput"
                type="file"
                class="hidden"
                :multiple="multiple"
                :accept="accepted.join(',')"
                @change="onChooseFile"
            />
        </div>

        <div v-if="errors.length" class="text-red-500 text-sm mt-2">
            <ul>
                <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
            </ul>
        </div>

        <div v-if="files && files.length" class="mt-4 grid gap-4 sm:grid-cols-2">
            <div
                v-for="(file, i) in files"
                :key="i"
                class=" rounded-lg p-3 flex items-center justify-between bg-white shadow-sm"
            >
                <div class="flex items-center space-x-3">
                    <img
                        v-if="file.is_image"
                        :src="file.preview"
                        class="w-16 h-16 object-cover rounded"
                    />

                    <div v-else class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-500">
                     <IconPlus class="size-6"  />
                    </div>

                    <div>
                        <p class="text-sm font-medium text-gray-700 truncate">{{ file.name }}</p>
                        <p class="text-xs text-gray-500">{{ fileSizeFormater(file.size) }}</p>
                    </div>
                </div>

                <button @click.stop="remove(i)" class="text-red-600  cursor-pointer">
                    <IconClose />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUpload } from '@/composables/useUpload';
import { ref } from 'vue';
import { fileSizeFormater } from '../utils/helpers';
import IconClose from '../icons/IconClose.vue';
import IconPlus from '../icons/IconPlus.vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    multi: {
        type: Boolean,
        default: false
    },
    max: {
        type: Number,
        default: 1
    },
    accepted: {
        type: Array,
        default: () => ['.png', '.jpg', '.jpeg', '.pdf']
    }
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);

const {
    files,
    errors,
    onDrop,
    onChooseFile,
    remove
} = useUpload(props, emit, fileInput);

const trigger = () => fileInput.value.click()
</script>