<template>
    <BaseCard>
        <div class="flex items-center justify-between mb-8">
            <h4 class="text-lg">{{ pricing?.title }}</h4>

            <BaseBadge>{{ pricing?.validity_time }}</BaseBadge>
        </div>

        <p class="flex items-center justify-end gap-2 mb-8">
            <span class="text-2xl font-family-semi-bold">{{ $filters.price(pricing?.value) }}</span>
            <span class="text-xs">تومان</span>
        </p>

        <template v-if="pricing?.features?.length">
            <ul class="list-disc list-inside mb-6">
                <li 
                    v-for="feature in pricing.features" 
                    :key="feature.id"
                    class="text-md text-neutral-500 mb-2"
                >
                    {{ feature?.title }}
                </li>
            </ul>
        </template>

        <BaseButton class="w-full" type="button">خرید اشتراک</BaseButton>
    </BaseCard>
</template>

<script setup>
import BaseBadge from '@/common/UI/BaseBadge.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import { ref } from 'vue'

defineProps({
    pricing: {
        type: Object,
        required: true
    }
});
</script>

<style scoped></style>