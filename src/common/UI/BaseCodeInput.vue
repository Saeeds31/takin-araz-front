<template>
    <div class="flex flex-row-reverse justify-center gap-2 mb-8">
        <template v-for="(val, index) in values" :key="index">
            <input 
                ref="inputs"
                :type="type"
                :disabled="disabled"
                v-model="values[index]"
                maxlength="1"
                @input="(e) => handleInput(e, index)"
                @keydown="(e) => handleKeydown(e, index)"
                @paste="(e) => handleClipboard(e, index)"
                class="w-12 h-12 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg font-medium disabled:bg-gray-100 appearance-none"
            >
        </template>
    </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
    modeValue: {
        type: String,
        default: ''
    },
    length: {
        type: Number,
        default: 4
    },
    type: {
        type: String,
        default: 'tel'
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'complete', 'change']);

const inputs = ref([]);
const values = ref(Array(props.length).fill(''));

watch(
    () => props.modeValue, 
    (val) => {
        const chars = val.split('');
        values.value = Array(props.length).fill('').map((_, i) => chars[i] || '');
    },
    { immediate: true }
);

watch(values, (val) => {
    const joined = val.join('');
    emit('update:modelValue', joined);
    emit('change', joined);

    if (joined.length === props.length && !joined.includes('')) {
        emit('complete', joined);
    }
}, { deep: true });

const focused = (index) => {
    nextTick(() => {
        inputs.value[index]?.focus();
        inputs.value[index]?.select();
    });
}

const handleInput = (e, index) => {
    const val = e.target.value.trim();

    if (val.length > 1) {
        const chars = val.split('').slice(0, props.length - index);
        chars.forEach((ch, i) => {
            values.value[index + i] = ch;
        });

        const next = index + chars.length;

        if (next < props.length) focused(next);
        return;
    }

    values.value[index] = val;

    if (val && index < props.length - 1) {
        focused(index + 1);
    }
}

const handleKeydown = (e, index) => {
    const key = e.key.toLowerCase();

    if (key === 'backspace' && !values.value[index] && index > 0) {
        focused(index - 1);
        return;
    }

    if (key === 'arrowleft' && index > 0) {
        focused(index - 1);
        return;
    }

    if (key === 'arrowright' && index < props.length - 1) {
        focused(index + 1);
        return;
    }
}

const handleClipboard = (e, index) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData('text').trim();

    if (!pasted) return;


    const chars = pasted.split('').slice(0, props.length);

    chars.forEach((ch, i) => {
        if (index + i < props.length) {
            values.value[index + i] = ch;
        }
    });

    if (index === 0) {
        nextTick(() => {
            if (chars.length < props.length) {
                focused(chars.length);
            } else {
                inputs.value[props.length - 1]?.blur();
            }
        });
    }
}
</script>

<style scoped></style>