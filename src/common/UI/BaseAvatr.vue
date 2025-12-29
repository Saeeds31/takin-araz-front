<template>
    <div class="shrink-0 shadow-md rounded-full overflow-hidden border-2" :class="[active ? 'border-emerald-500' : 'border-yellow-500'], classes" >
        <img class="object-cover h-full" :src="$filters.resource(src)" alt="Avatar image">
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    size: {
        type: String,
        required: false,
        default: 'sm',
        validator: (v) => ['sm', 'md', 'lg'].includes(v)
    }
});

const classes = computed(() => {
    const sizes = { sm: 'size-14', md: 'size-22', lg: 'size-30' };

    return sizes[props.size];
})

</script>

<style scoped></style>