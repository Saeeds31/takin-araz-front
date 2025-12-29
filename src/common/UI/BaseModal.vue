<template>
    <Transition name="fade">
        <Teleport to="body" v-if="show">
            <div 
                class="fixed flex items-center justify-center inset-0 bg-black/50 z-50 backdrop-blur-xs"
                @click.self="close"
            >
                <div class="bg-white rounded-none px-4 pt-4 pb-4 shadow w-full h-full lg:w-auto lg:h-auto lg:min-w-[500px] lg:min-h-32 lg:rounded">
                    <slot></slot>
                </div>
            </div>
        </Teleport>
    </Transition>
</template>

<script setup>
import { ref, Transition, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: false
    },
    backdropClose: {
        type: Boolean,
        required: false,
        default: true
    }
});

const emit = defineEmits(["update:modelValue"]);

const show = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
    show.value = value;
});

const close = () => {
    if (!props.backdropClose) return;
    
    show.value = false;
    emit("update:modelValue", false);
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>