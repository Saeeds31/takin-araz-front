<template>
    <li class="mb-3">
        <div class="flex items-center py-3 px-2 cursor-pointer" @click="expand">
            <div class="grow">
                <slot name="header"></slot>
            </div>
            <IconChevron v-if="isExpand" />
        </div>
    
        <Transition name="accordion">
            <div class="ps-5 py-2" v-if="isOpen && isExpand">
                <slot name="submenu"></slot>
            </div>
        </Transition>
    </li>
</template>

<script setup>
import { ref, Transition } from 'vue';
import IconChevron from '../icons/IconChevron.vue';

const isOpen = ref(false);

const props = defineProps({
    label: {
        type: String,
        required: false
    },
    isExpand: {
        type: Boolean,
        default: false
    }
});

const expand = () => {
    if(!props.isExpand) return;
    
    isOpen.value = !isOpen.value;
} 

</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-4px);
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}
</style>