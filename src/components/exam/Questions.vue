<template>
    <div v-for="(question, index) in questions" :key="index">
        <div>
            <p class="flex items-start gap-2 mb-3 select-none">
                <span class="text-sm underline text-nowrap"> {{ handleIndex(index) }} : </span>
                <span class="text-sm font-family-semi-bold"> {{ question.question }} </span>
            </p>

            <div class="flex items-center flex-wrap gap-10 mb-8">
                <div v-for="a in 4" :key="a" class="flex items-center gap-3">
                    <label class="flex items-start gap-1 text-xs  cursor-pointer select-none" :for="`q${index}-a${a}`">
                        <span>{{ alphabets[a - 1] }}</span>
                        <span>{{ question[`item_${a}`] }}</span>
                    </label>
                    <input v-model="answers[index]" type="radio" :id="`q${index}-a${a}`" :name="`question-${index}`"
                        :value="a">
                </div>
            </div>
        </div>
    </div>

    <BaseButton v-if="questions&&questions.length" :disabled="!canSubmit" @click="submit">ثبت پاسخ ها</BaseButton>
    
</template>

<script setup>
import BaseButton from '@/common/UI/BaseButton.vue';
import { handleIndex } from '@/common/utils/helpers';
import { useErrors } from '@/composables/useError';
import { useExam } from '@/stores/modules/exam';
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const { push } = useRouter();
const { params } = useRoute();
const store = useExam();
const { displayError } = useErrors();

const props = defineProps({
    questions: {
        type: Array,
        required: true,
        default: [],
    }
});

const alphabets = ['الف)', 'ب)', 'ج)', 'د)'];
const answers = ref(new Array(props.questions.length).fill(undefined));

const canSubmit = computed(() => {
    return answers.value.length === props.questions.length && answers.value.every(a => a !== undefined);
});

const courseId = computed(() => params['id']);

const submit = async () => {
    if (!canSubmit.value) {
        toast.error('پیش از ثبت نهایی آزمون، به تمامی سوالات پاسخ دهید');
        return;
    }

    const fd = new FormData();

    props.questions.forEach((q, index) => {
        fd.append(`answers[${index}][question_id]`, q.id);
        fd.append(`answers[${index}][selected_option]`, answers.value[index]);
    });

    try {
        const response = await store.save(courseId.value, fd);
        toast.success('آزمون ثبت شد');
        setTimeout(() => {
            push(`/panel/course/${courseId.value}`);
        }, 5000);
    } catch (error) {
        displayError(error);
    }
}

onMounted(() => {
    answers.value = new Array(props.questions.length).fill(undefined);
});

</script>

<style scoped></style>