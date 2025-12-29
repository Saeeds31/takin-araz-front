<template>
    <BaseCard>
        <img 
            :src="$filters.resource(purcahse?.course?.image)" 
            :alt="purcahse.title" 
            class="w-full mb-4 rounded-md" 
            loading="lazy"
        >

        <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg">{{ purcahse?.course?.title }}</h2>

            <!-- <div class="flex items-center gap-2">
                <span class="text-sm text-neutral-400">تعداد جزوات :</span>
                <span>{{ purcahse?.leaflet }}</span>
            </div> -->
        </div>

        <!-- <p class="text-sm text-neutral-400 mb-3">{{ purcahse?.summary }}</p> -->

        <BaseButton class="w-full" :to="`course/${purcahse?.course?.id}`" >مشاهده دوره</BaseButton>
    </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseButton from '@/common/UI/BaseButton.vue';

const props = defineProps(['purcahse']);

</script>

<style scoped></style>