<template>
    <Questions :questions="questions" />
</template>

<script setup>
import Questions from '@/components/exam/Questions.vue';
import { useErrors } from '@/composables/useError';
import { useExam } from '@/stores/modules/exam';
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const { push } = useRouter();
const store = useExam();
const { displayError } = useErrors();
const questions = computed(() => store.getQuestions);
const courseId = computed(() => params['id']);
const init = async () => {
    try {
        await store.load(courseId.value);
    } catch (error) {
        displayError(error);
        setTimeout(() => {
            push(`/panel/course/${courseId.value}`)
        }, 2000);
    }
}

onMounted(async () => {
    await init();
})

</script>

<style scoped></style>