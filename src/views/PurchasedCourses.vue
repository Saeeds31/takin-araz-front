<template>
    <div v-if="purcahses?.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <PurchasedCourse v-for="(purcahse, index) in purcahses" :key="purcahse.id" :purcahse="purcahse" />
    </div>

    <Empty v-else />
</template>

<script setup>
import Empty from '@/common/components/Empty.vue';
import PurchasedCourse from '@/components/courses/PurchasedCourse.vue';
import { useCourse } from '@/stores/modules/course';
import { computed, onMounted } from 'vue';

const store = useCourse();

const purcahses = computed(() => store.purchases);

onMounted(() => {
    store.fetchPurchasedFromServer();
})

</script>

<style scoped></style>