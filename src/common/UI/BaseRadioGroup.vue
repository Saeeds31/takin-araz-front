<template>
    <div class="flex space-x-2 gap-3">
        <label
            v-for="(option, index) in options"
            :key="index"
            :for="option.id"
            class="flex items-center space-x-2 cursor-pointer"
        >
            <span class="text-gray-800 text-sm font-family-semi-bold">{{ option[labelBy] }}</span>

            <input 
                type="radio" 
                name=""
                :id="option.id"
                :value="option[trackBy]"
                v-model="initValue"
                class="text-blue-600 border-gray-300 focus:ring-blue-500"
            >
        </label>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: [String, Number, Boolean],
        default: null
    },
    trackBy: {
        type: String,
        default: 'id'
    },
    labelBy: {
        type: String,
        default: 'label'
    },
});

const emit = defineEmits(['update:modelValue', 'change']);

const initValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    initValue.value = val;
});

watch(initValue, (val) => {
    emit('update:modelValue', val);
    emit('change', val);
});
</script>

<style scoped></style>