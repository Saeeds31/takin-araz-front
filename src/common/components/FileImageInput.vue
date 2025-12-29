<template>
    <div>
        <BaseFieldset :legend="label" :state="state">
            <!-- پیش‌نمایش -->
            <div v-if="!mini && previewUrl" class="rounded-lg overflow-hidden mt-2">
                <img :src="previewUrl" alt="Preview" class="w-full max-h-52 object-cover cursor-pointer"
                    @click="previewUrl && isImage && openLightbox()" />
                <!-- آیکون PDF اگر فایل PDF باشد -->
                <div v-if="isPdf" class="flex flex-col items-center justify-center py-8 bg-gray-100">
                    <img :src="pdfPlaceholder" class="w-24 h-24" />
                    <p class="mt-2 text-sm text-gray-600">فایل PDF انتخاب شده</p>
                </div>
            </div>

            <!-- دکمه آپلود -->
            <BaseButton variant="outlined" class="mt-4 w-full" @click="triggerFileInput">
                {{ previewUrl ? 'تغییر فایل' : 'بارگذاری فایل' }}
            </BaseButton>

            <input ref="fileInput" class="hidden" type="file" :accept="accept" @change="onFileChange" />
        </BaseFieldset>

        <span class="text-xs text-red-600 px-2 mt-1">{{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useField } from 'vee-validate'
import imagePlaceholder from '@/assets/images/placeholder-image.png'
import pdfPlaceholder from '@/assets/images/placeholder-pdf.png'
import BaseButton from '../UI/BaseButton.vue'
import BaseFieldset from '../UI/BaseFieldset.vue'

const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, default: '' },
    mini: { type: Boolean, default: false },
    accept: { type: String, default: 'image/*,.pdf' }
})

const fileInput = ref(null)

// اینجا فقط URL ذخیره می‌کنیم (string یا null)، نه File object
const { value: fieldValue, errorMessage, meta } = useField(props.name, undefined, {
    initialValue: null
})

// پیش‌نمایش محلی (dataURL یا URL سرور)
const previewUrl = ref(null)
const isPdf = ref(false)
const isImage = computed(() => previewUrl.value && !isPdf.value)

const state = computed(() => {
    if (errorMessage.value) return 'error'
    if (meta.valid) return 'success'
    return 'default'
})

// وقتی value از والد یا initialValues تغییر کرد
watch(
    () => fieldValue.value,
    (newVal) => {
        if (!newVal) {
            previewUrl.value = null
            isPdf.value = false
            return
        }

        // اگر string هست یعنی از سرور برگردونده (مسیر فایل قدیمی)
        if (typeof newVal === 'string') {
            if (newVal.toLowerCase().includes('.pdf')) {
                previewUrl.value = pdfPlaceholder
                isPdf.value = true
            } else {
                previewUrl.value = import.meta.env.VITE_BASE_RESOURCE_URL + newVal
                isPdf.value = false
            }
        }
    },
    { immediate: true }
)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // فقط File رو به فرم می‌فرستیم، ولی در فیلد VeeValidate فقط URL یا مسیر ذخیره می‌کنیم؟ نه!
    // بهتره در فیلد VeeValidate خود File رو نگه داریم تا موقع submit درست بره
    fieldValue.value = file

    // پیش‌نمایش
    if (file.type === 'application/pdf') {
        previewUrl.value = pdfPlaceholder
        isPdf.value = true
    } else {
        const reader = new FileReader()
        reader.onload = (ev) => {
            previewUrl.value = ev.target.result
            isPdf.value = false
        }
        reader.readAsDataURL(file)
    }

    // پاک کردن value input تا بشه دوباره همون فایل رو انتخاب کرد
    e.target.value = ''
}

const openLightbox = () => {
    // اینجا می‌تونی از هر lightbox دلخواهی استفاده کنی
    // مثلاً EventBus یا Pinia یا مستقیم window.open
    window.open(previewUrl.value, '_blank')
}
</script>