<template>
    <nav class="w-[90vw] mx-auto" v-if="salePlan">
        <ul class="flex items-center gap3">
            <li class="flex items-center gap-2">
                <router-link to="/">
                    صفحه اصلی
                </router-link>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="iconify iconify--bxi bxi text-neutral-40 dark:text-neutral-60" width="1"
                    height="1" viewBox="0 0 24 24" style="font-size: 1rem; width: 1rem; height: 1rem;">
                    <path d="M15.71,7.41l-4.59,4.59,4.59,4.59-1.41,1.41-6-6,6-6,1.41,1.41Z" fill="currentColor">
                    </path>
                </svg>
            </li>
            <li class="flex items-center gap-2">
                <router-link to="#">
                    طرح های فروش
                </router-link>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="iconify iconify--bxi bxi text-neutral-40 dark:text-neutral-60" width="1"
                    height="1" viewBox="0 0 24 24" style="font-size: 1rem; width: 1rem; height: 1rem;">
                    <path d="M15.71,7.41l-4.59,4.59,4.59,4.59-1.41,1.41-6-6,6-6,1.41,1.41Z" fill="currentColor">
                    </path>
                </svg>
            </li>

            <li class="flex items-center gap-2">
                <router-link class="flex items-center gap-1" to="#">

                    <span class="font-bold">
                        {{ salePlan?.title }}
                    </span>
                </router-link>
            </li>

        </ul>
    </nav>
    <section v-if="salePlan" class="mt-12 mb-12 flex flex-col items-center gap-2">
        <h2 class=" text-2xl font-bold">
            {{ salePlan.title }}
        </h2>
        <p class="flex items-center gap-1.5">
            <span>
                زمان ثبت نام:
            </span>
            <span>از تاریخ</span>
            <span class="font-bold">
                {{ new Date(salePlan.start_date).toLocaleDateString("fa") }}
            </span>
            <span>تا تاریخ:</span>
            <span class="font-bold">
                {{ new Date(salePlan.end_date).toLocaleDateString("fa") }}
            </span>
        </p>
    </section>
    <main class="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 items-start w-screen px-[5%] mt-8"
        v-if="salePlan">
        <carCard @handlerCar="handlerId" v-for="(item, index) in salePlan.cars" :key="index" :car="item"
            :salemode="true" />
    </main>
    <div v-else class="flex items-center justify-center mt-[86px]">
        <div class="loader">
            <div class="loader_cube loader_cube--color"></div>
            <div class="loader_cube loader_cube--glowing"></div>
        </div>
    </div>
    <!--  -->
    <section v-show="salePlan && selectId" id="selectSale">
        <div class="h-[40vh] overflow-y-scroll w-[90%] mx-auto mt-8 mb-4 px-12 py-12">
            <h3 class="font-bold">
                📜 قوانین و مقررات برای ثبت‌نام و پیش‌خرید خودرو خارجی

            </h3>
            <ul class="flex flex-col gap-4 items-start mt-16">
                <li>
                    1. شرایط عمومی
                    ثبت‌نام صرفاً برای افراد بالای ۱۸ سال امکان‌پذیر است.

                    کاربر موظف است اطلاعات شخصی و هویتی خود را به‌صورت صحیح و کامل وارد کند.

                    هرگونه ثبت‌نام با اطلاعات جعلی یا ناقص موجب لغو قرارداد خواهد شد.

                </li>
                <li>
                    2. شرایط مالی
                    مبلغ پیش‌پرداخت (بیعانه) غیرقابل‌استرداد است مگر در شرایط خاصی که شرکت اعلام کند.

                    پرداخت‌ها باید صرفاً از طریق درگاه‌های رسمی سایت انجام شود.

                    قیمت نهایی خودرو ممکن است با توجه به نرخ ارز، تعرفه‌های گمرکی و هزینه‌های حمل‌ونقل تغییر کند.

                </li>
                <li>

                    3. شرایط تحویل
                    زمان تحویل خودرو تقریبی بوده و به شرایط واردات، ترخیص و قوانین گمرکی وابسته است.

                    شرکت متعهد است در صورت تأخیر بیش از مدت مشخص (مثلاً ۶ ماه)، امکان انصراف و بازگشت وجه را فراهم کند.

                    خودروها مطابق با استانداردهای واردات کشور تحویل داده خواهند شد.

                </li>
                <li>
                    4. حقوق و تعهدات مشتری
                    مشتری موظف است پس از اعلام شرکت، مدارک لازم برای ترخیص و شماره‌گذاری را ارائه دهد.

                    مشتری حق انتقال قرارداد به شخص ثالث را بدون اطلاع و تأیید شرکت ندارد.

                    مشتری موظف است قوانین راهنمایی و رانندگی و مقررات مربوط به خودروهای وارداتی را رعایت کند.

                </li>
                <li>

                    5. حقوق و تعهدات شرکت
                    شرکت موظف است اطلاعات شفاف در مورد خودرو، قیمت، شرایط تحویل و خدمات پس از فروش ارائه دهد.

                    شرکت حق دارد در صورت بروز مشکلات قانونی یا گمرکی، قرارداد را با بازگرداندن وجه فسخ کند.

                    شرکت مسئولیتی در قبال تغییرات قوانین واردات و تعرفه‌های دولتی ندارد.

                </li>
                <li>
                    6. فسخ قرارداد
                    در صورت عدم پرداخت اقساط یا مدارک ناقص، شرکت حق فسخ قرارداد را دارد.

                    مشتری در صورت تغییر شرایط غیرقابل پیش‌بینی (مانند ممنوعیت واردات) حق فسخ قرارداد و دریافت وجه را
                    خواهد داشت.


                </li>
                <li>

                    7. پذیرش قوانین
                    ثبت‌نام در سایت به منزله پذیرش کامل این قوانین و مقررات است.

                    کاربر موظف است قبل از تأیید نهایی، تمامی بندهای این قوانین را مطالعه کند.

                </li>
            </ul>
        </div>
        <div class="w-full">

            <BaseButton @click="register()" :disabled="loader" class="w-[310px] mx-auto mt-8 mb-8 base-back">
                تایید قوانین و پیش ثبت نام
            </BaseButton>
        </div>
    </section>
</template>

<script setup>
import carCard from '@/components/shared/carCard.vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { computed, onMounted, ref, watch } from "vue"
import "swiper/css";
import "swiper/css/effect-coverflow";
import BaseButton from '@/common/UI/BaseButton.vue';
import "swiper/css/pagination";
import { useSalePlan } from '@/stores/modules/salePlan';
import { useRoute } from "vue-router";
import router from "@/router";
import { getCurrentInstance } from 'vue'
import { useProfile } from '@/stores/modules/profile';
import { toast } from "vue3-toastify";
const instance = getCurrentInstance()
const $axios = instance.appContext.config.globalProperties.$axios;
const store = useSalePlan();
const store1 = useProfile();
const route = useRoute();
let selectId = ref(null);
const user = computed(() => store1.user);
function handlerId(id) {
    if (!id) return;
    selectId.value = id;
    setTimeout(() => {
        document.getElementById('selectSale').scrollIntoView({ behavior: 'smooth' })
    }, 500)
}
async function register() {
    if (!user.value) {
        window.localStorage.setItem('lastpage', route.fullPath);
        return toast.error('برای پیش ثبت نام لطفا ابتدا وارد حساب کاربری خود شوید')
    }
    try {
        loader.value = true;
        const fd = new FormData();
        fd.append('car_id', selectId.value)
        let res = await $axios.post(`/car-request/${route.params.id}`, fd);
        if (res.data.success) {
            toast.success(res.data.message);
            setTimeout(() => {
                router.push('/')
            }, 5000);
        }
    } catch (error) {
        toast.error(error?.response.data.message)
    } finally {
        loader.value = false;
    }
}
onMounted(() => {
    if (route.query.car_id) {
        handlerId(route.query.car_id)
    }
});
const salePlan = computed(() => store.salePlan);
watch(() => salePlan.value, () => {
    handlerId(route.query.car_id)

})
const modules = [EffectCoverflow, Pagination];
const coverflowConfig = {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1.1,
    slideShadows: false,
};
let loader = ref(false);
store.getSaleDetailFromServer(route.params.id);
async function gotoLink(id) {
    loader.value = true;
    try {
        let res = await $axios.get(`/check-sale/${id}`);
        if (res.data.salePlan) {
            router.push(`/sales-plan/${res.data.salePlan}?car_id=${id}`);
        } else {
        }
    } catch (error) {
        console.log(error);

    } finally {
        loader.value = false
    }
    // 
}

</script>
<style>
/* From Uiverse.io by mobinkakei */
.loader {
    width: 150px;
    height: 150px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader_cube {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 30px;
}

.loader_cube--glowing {
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.loader_cube--color {
    z-index: 1;
    filter: blur(2px);
    background: linear-gradient(135deg, #1afbf0, #da00ff);
    animation: loadtwo 2.5s ease-in-out infinite;
}

@keyframes loadtwo {
    50% {
        transform: rotate(-80deg);
    }
}

.custom-swiper :deep(.swiper-slide) {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.75);
    transition: transform 0.4s ease, opacity 0.4s ease;
}

/* وسطی بزرگ‌تر */
.custom-swiper :deep(.swiper-slide-active) {
    transform: scale(1.15);
    z-index: 3;
}

/* کناری‌ها کمی بزرگ‌تر از بقیه ولی محو‌تر */
.custom-swiper :deep(.swiper-slide-next),
.custom-swiper :deep(.swiper-slide-prev) {
    transform: scale(0.5);
}

/* smooth حرکت نرم */
.custom-swiper :deep(.swiper-wrapper) {
    transition-timing-function: cubic-bezier(0.22, 0.9, 0.32, 1);
}

/* عکس محصول */
.product-image {
    height: 380px;
    object-fit: contain;
}

/* pagination */
.custom-swiper :deep(.swiper-pagination-bullet) {
    background-color: var(--bg-secondary-fade);
    opacity: 0.6;
    transition: all 0.25s ease;
    margin-top: 20px;
}

.custom-swiper :deep(.swiper-pagination-bullet-active) {
    background-color: var(--bg-secondary);
    opacity: 1;
    transform: scale(1.4);
}

/* ریسپانسیو */
@media (max-width: 575px) {
    .custom-swiper :deep(.swiper-slide) {
        transform: scale(1);
        opacity: 1;
    }

    .product-image {
        height: 180px;
    }
}

@media (min-width: 576px) and (max-width: 767px) {
    .custom-swiper {
        padding: 0 40px;
    }

    .custom-swiper :deep(.swiper-slide) {
        transform: scale(0.9);
    }

    .custom-swiper :deep(.swiper-slide-active) {
        transform: scale(1.05);
    }
}
</style>