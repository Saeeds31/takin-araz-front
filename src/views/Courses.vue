<template>
    <div  v-if="courses.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Course v-for="(course, index) in courses" :key="course.id" :course="course" />
    </div>

    <Empty v-else />
</template>

<script setup>
import Empty from '@/common/components/Empty.vue';
import Course from '@/components/courses/Course.vue';
import { useCourse } from '@/stores/modules/course';
import { computed, onMounted, ref } from 'vue'

const store = useCourse();

const courses = computed(() => store.courses);

onMounted(() => {
    store.fetchCoursesFromServer();
})

</script>

<style scoped></style>