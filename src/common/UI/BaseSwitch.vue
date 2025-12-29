<template>
    <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" v-model="checked"/>

        <div class="w-12 h-6 bg-gray-300 rounded-xl peer peer-checked:bg-emerald-500 transition-colors duration-300"></div>
        <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const checked = ref(props.modelValue);

watch(checked, (val) => {
    emit('update:modelValue', val);
});

watch(props.modelValue, (val) => {
    checked.value = val;
});
</script>