<template>
    <div class="relative mb-4">
        <template v-if="type === 'select'">
            <BaseFieldset :legend="label" :state="state" class="py-1!">
                <Multiselect v-model="value" :options="customOptions" :custom-label="customLabel" :allow-empty="false"
                    :searchable="false" :placeholder="placeholder" :select-label="''" :deselect-label="''"
                    :selected-label="'انتخاب شده'">
                </Multiselect>
            </BaseFieldset>
        </template>
        <template v-else-if="type === 'datepicker'">
            <BaseFieldset :legend="label" :state="state" class="">
                <input type="text" :id="name" :placeholder="placeholder" class="w-full border-0 outline-0  mb-0"
                    :class="`custom-input-${name}`">
                <date-picker v-model="value" :id="name + 'persiantime'" :custom-input="`.custom-input-${name}`"
                    format="YYYY/MM/DD" display-format="jYYYY/jMM/jDD" />
            </BaseFieldset>
        </template>
        <template v-else-if="type === 'textarea'">
            <BaseFieldset :legend="label" :state="state" class="">
                <textarea v-model="value" :dir="dir" :id="name" class="w-full border-0 outline-0" :rows="4"
                    :placeholder="placeholder"></textarea>
            </BaseFieldset>
        </template>
        <template v-else-if="type === 'price'">
            <BaseFieldset :legend="label" :state="state" class="">
                <input v-model="value" :dir="dir" :type="type || 'text'" :id="name" :placeholder="placeholder"
                    class="w-full border-0 outline-0" :autocomplete="autocomplete">
            </BaseFieldset>
            <span class="text-green-500">{{ isNaN(value) ? "" : Number(value).toLocaleString('fa') + " تومان " }}</span>
        </template>
        <template v-else>
            <BaseFieldset :legend="label" :state="state" class="">
                <input v-model="value" :dir="dir" :type="type || 'text'" :id="name" :placeholder="placeholder"
                    class="w-full border-0 outline-0" :autocomplete="autocomplete">
            </BaseFieldset>
        </template>
        <!-- Hint -->
        <span v-if="hint"
            class="block select-none text-xs text-neutral-400 px-2 mt-1 before:content-['•'] before:text-sm before:me-1 before:align-text-bottom">
            {{ hint }}
        </span>
        <!-- Error -->
        <span class="block text-xs text-red-600 px-2 mt-1">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate';
import Multiselect from 'vue-multiselect';
import BaseFieldset from '@/common/UI/BaseFieldset.vue';
import { number } from 'yup';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    placeholder: {
        type: String,
        required: false,
        default: ''
    },
    label: {
        type: String,
        required: false,
    },
    hint: {
        type: String,
        required: false,
    },
    dir: {
        type: String,
        required: false,
    },
    options: {
        type: Array,
        required: false,
    },
    autocomplete: {
        type: Boolean,
        default: 'off',
        required: false,
    },
});

const state = computed(() => {
    if (errorMessage.value) return 'error';
    if (meta.valid) return 'success';

    return 'default';
});

const customOptions = computed(() => {
    return props.options.map(option => option.value);
});

const customLabel = computed(() => {
    return opt => {
        const found = props.options.find(o => o.value === opt);
        return found ? found.label : opt;
    }
})

const { value, errorMessage, meta } = useField(() => props.name);

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped></style>