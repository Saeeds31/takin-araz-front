<template>
    <div
        class="flex items-center justify-between flex-col md:flex-row bg-base gap-8 lg:gap-20 py-5 md:py-9 px-2 md:px-6 rounded-xl mb-8">
        <Branding class="shrink-0" />
        <h2 class="text-white">
            لطفا تمامی اطلاعات فرم را با دقت پر کنید
        </h2>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import IconCircle from '@/common/icons/IconCircle.vue';
import Branding from '../components/Branding.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// active, inactive, completed, error
const steps = ref([
    { id: 1, to: '/register/step/1', label: 'اطلاعات هویتی', state: 'inactive' },
    { id: 2, to: '/register/step/2', label: 'مدارک هویتی', state: 'inactive' },
    { id: 3, to: '/register/step/3', label: 'اطلاعات فیزیکی', state: 'inactive' },
    { id: 4, to: '/register/step/4', label: 'مدارک تحصیلی', state: 'inactive' },
]);

const createAvatar = (index) => {
    return index + 1 < 10 ? `0${index + 1}` : index + 1;
}

</script>

<style scoped></style>