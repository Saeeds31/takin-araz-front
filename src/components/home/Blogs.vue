<template>
    <div class="mt-20">
        <h2 class="mb-10 text-2xl font-family-bold text-center">بلاگ</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-for="blog in blogs">
                <div class="border border-gray-300 rounded-xl p-5">
                    <div class="mb-4 relative rounded-lg overflow-hidden aspect-4/3">
                        <img class="w-full h-full object-cover" :src="blog.thumbnail" :alt="blog.title">

                        <div class="absolute top-0 end-0 text-white bg-neutral-500/85 flex items-center gap-2 m-4 px-4 py-2 rounded-4xl">
                            <IconViews />
                            {{ blog.views }}
                        </div>
                    </div>

                    <h5 class="mb-2 text-lg">{{ blog.title }}</h5>
                    <p class="text-sm leading-7 font-family-regular text-gray-500 mb-4">{{ blog.summary }}</p>

                    <BaseButton class="w-fit ms-auto" variant="outlined" :to="'#'">ادامه مطلب</BaseButton>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import blog1 from '@/assets/images/samples/blog1.png';
import blog2 from '@/assets/images/samples/blog2.png';
import blog3 from '@/assets/images/samples/blog3.png';
import BaseButton from '@/common/UI/BaseButton.vue';
import IconViews from '@/common/icons/IconViews.vue';

const blogs = ref([
    {
        id: 1,
        title: 'ارزش‌های اخلاقی و ایمنی در بادیگاری حرفه‌ای',
        summary: 'در این بلاگ به بررسی اهمیت اخلاق حرفه‌ای و ایمنی در حوزه بادیگاری می‌پردازیم. از مسئولیت‌های متخصص تا نحوه برخورد با چالش‌های اخلاقی و نکات ایمنی در محیط کار را پوشش می‌دهیم... ',
        views: 123,
        thumbnail: blog1
    },
    {
        id: 2,
        title: 'چگونه برای آزمون‌های بادیگاری آماده شویم ',
        summary: 'این پست، یک نقشه راهی عملی برای آماده شدن به آزمون‌های بادیگاری است. از تعیین هدف و زمان‌بندی مطالعه تا مرور منابع، تمرین‌های عملی، شبیه‌سازی آزمون و نکات مدیریت استرس در روز آزمون را شامل می‌شود...',
        views: 456,
        thumbnail: blog2
    },
    {
        id: 3,
        title: 'مسیر یادگیری بادیگاری با پروژه‌های واقعی',
        summary: 'مسیر یادگیری از سطوح مبتدی تا پیشرفته را با تمرکز بر پروژه‌های واقعی تشریح می‌کنیم. چگونه با تکمیل پروژه‌های کوچک مهارت‌ها را تقویت کنیم، بازخورد کامل دریافت کنیم و به گواهی‌نامه پایان دوره دست یابیم...',
        views: 789,
        thumbnail: blog3
    },
]);
</script>

<style scoped></style>