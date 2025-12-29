<template>
    <BaseCard>
        <img 
            :src="$filters.resource(course?.image)" 
            :alt="course?.title" 
            class="w-full mb-4 rounded-md aspect-13/9 object-cover" 
            loading="lazy"
        >

        <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg">{{ course?.title }}</h2>

            <!-- <div class="flex items-center gap-2">
                <span class="text-sm text-neutral-400">تعداد جزوات :</span>
                <span>{{ course?.leaflet }}</span>
            </div> -->
        </div>

        <!-- <p class="text-sm text-neutral-400 mb-3">{{ course?.summary }}</p> -->

        <div class="flex justify-between items-center mb-5">
            <span class="text-sm">هزینه دوره :</span>
            <span class="text-xl font-family-semi-bold">
                {{ $filters.price(course?.price) }} 
                <span class="text-xs ms-1.5">تومان</span>
            </span>
        </div>

        <BaseButton class="w-full" :to="`course/${course.id}`">خرید دوره</BaseButton>
    </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseButton from '@/common/UI/BaseButton.vue';

const props = defineProps(['course']);

</script>

<style scoped></style>