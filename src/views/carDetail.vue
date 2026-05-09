<template>
    <nav class="w-[90vw] mx-auto" v-if="car">
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
                <router-link class="flex items-center gap-1" to="#">
                    <span>
                        برند
                    </span>
                    <span class="font-bold">
                        {{ car.car?.brand?.title }}
                    </span>
                </router-link>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="iconify iconify--bxi bxi text-neutral-40 dark:text-neutral-60" width="1"
                    height="1" viewBox="0 0 24 24" style="font-size: 1rem; width: 1rem; height: 1rem;">
                    <path d="M15.71,7.41l-4.59,4.59,4.59,4.59-1.41,1.41-6-6,6-6,1.41,1.41Z" fill="currentColor">
                    </path>
                </svg>
            </li>
            <li class="flex items-center gap-2">
                <router-link to="/">
                    {{ car.car.name }}
                </router-link>
            </li>

        </ul>
    </nav>
    <main class="bg-neutral-950 text-white mt-6 px-[5%] pt-8 pb-14 w-[100vw]" v-if="car">
        <div class="mx-auto w-full max-w-6xl grid items-start gap-8 lg:grid-cols-[2fr_1fr] grid-cols-1">
            <!-- LEFT: Gallery + Description -->
            <section class="w-full">
                <!-- Top area: name + specs short + main image -->
                <section class="w-full">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        <!-- Info card (left on desktop) -->
                        <div
                            class="flex flex-col justify-between gap-6 px-5 py-5 rounded-2xl border border-yellow-400/20 bg-neutral-900/35 shadow-[0_0_0_1px_rgba(252,211,73,0.08)]">
                            <div>
                                <h1 class="font-bold text-3xl leading-tight pb-4 border-b border-white/10">
                                    {{ car.car.name }}
                                </h1>

                                <div class="mt-4 space-y-3">
                                    <div class="flex items-center justify-between gap-3">
                                        <span class="text-neutral-300">نوع ماشین:</span>
                                        <span class="font-bold text-yellow-200">
                                            {{ car.car.category?.title }}
                                        </span>
                                    </div>

                                    <div class="flex items-center justify-between gap-3">
                                        <span class="text-neutral-300">برند:</span>
                                        <span class="font-bold text-yellow-200">
                                            {{ car.car.brand?.title }}
                                        </span>
                                    </div>

                                    <div class="flex items-center justify-between gap-3">
                                        <span class="text-neutral-300">قیمت:</span>
                                        <span class="font-bold text-yellow-300">
                                            {{ Number(car.car.price).toLocaleString('fa') }} دلار
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="w-full flex lg:flex-row flex-col items-start lg:items-center justify-between gap-4">
                                <q class="text-neutral-300  bg-white/0">
                                    <span class="text-yellow-200 font-semibold">نکته:</span>
                                    <br />
                                    باتوجه به نوسان قیمت بازار، ارقام تقریبی وارد شده است
                                </q>

                                <BaseButton :disabled="loader" @click="gotoLink(car.car.id)" class="base-back">
                                    پیش ثبت نام
                                </BaseButton>
                            </div>
                        </div>

                        <!-- Main image -->
                        <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/20">
                            <img class="w-full h-full min-h-[260px] lg:min-h-[420px] object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
                                v-lazy="$filters.resource(car.car.image)" :alt="car.car.name" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent">
                            </div>
                            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <span
                                    class="px-3 py-1 rounded-full border border-yellow-400/25 bg-yellow-400/10 text-yellow-200 text-sm">
                                    تاپ‌کار • جزئیات خودرو
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Other images slider -->
                <section v-if="car.car.images && car.car.images.length" class="w-full overflow-hidden mt-10">
                    <div class="flex items-center justify-between gap-4 mb-4">
                        <h3 class="font-bold text-2xl">
                            سایر تصاویر
                        </h3>

                        <div class="flex items-center gap-2">
                            <button @click="next" class="
                  size-10 rounded-full bg-white/5 border border-white/10
                  flex items-center justify-center text-white/80
                  hover:bg-yellow-400/15 hover:border-yellow-400/35 hover:text-white
                  transition-colors duration-150
                " aria-label="بعدی">
                                <IconArrowRight :color="'currentColor'" />
                            </button>

                            <button @click="prev" class="
                  size-10 rounded-full bg-white/5 border border-white/10
                  flex items-center justify-center text-white/80
                  hover:bg-yellow-400/15 hover:border-yellow-400/35 hover:text-white
                  transition-colors duration-150
                " aria-label="قبلی">
                                <IconArrowLeft :color="'currentColor'" />
                            </button>
                        </div>
                    </div>

                    <div
                        class="custom-swiper !rounded-2xl overflow-hidden border border-yellow-400/25 shadow-[0_20px_60px_rgba(0,0,0,0.55)] bg-neutral-950/35">
                        <Swiper :modules="modules" @swiper="onSwiper" :autoplay="false" :loop="true" :speed="700"
                            :slides-per-view="1" :space-between="0" :effect="'fade'" :pagination="{ clickable: true }"
                            class="w-full mx-auto">
                            <SwiperSlide v-for="(slide, i) in car.car.images" :key="i" class="product-slide">
                                <div class="slide-item w-full h-[280px] sm:h-[360px] lg:h-[460px] relative">
                                    <img class="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out hover:scale-[1.03]"
                                        v-lazy="$filters.resource(slide.path)" :alt="`تصویر ${i + 1}`" />

                                    <!-- gradient overlay for better readability -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent">
                                    </div>

                                    <!-- subtle frame glow -->
                                    <div
                                        class="absolute inset-0 border border-yellow-400/10 rounded-2xl pointer-events-none">
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>

                <!-- Description -->
                <div class="mt-8 whitespace-pre-line text-neutral-200 leading-8">
                    <div class="p-5 rounded-2xl border border-white/10 bg-neutral-900/20">
                        {{ car.car.description }}
                    </div>
                </div>
            </section>

            <!-- RIGHT: Specifications -->
            <section v-if="car.specifications" class="w-full">
                <div class="space-y-6">
                    <div class="mb-2 px-2">
                        <h3 class="font-bold text-2xl">مشخصات</h3>
                        <p class="text-neutral-400 mt-2 text-sm">
                            خلاصه اطلاعات فنی خودرو
                        </p>
                    </div>

                    <div v-for="(item, index) in car.specifications" :key="index"
                        class="mt-2 border border-white/10 rounded-2xl p-5 bg-neutral-900/25 shadow-[0_0_0_1px_rgba(252,211,73,0.06)]">
                        <q class="font-bold text-xl text-yellow-200">
                            {{ item.group_title }}
                        </q>

                        <ul class="w-full mt-4">
                            <li v-for="(spe, index) in item.rows" :key="index"
                                class="flex w-full justify-between items-center gap-4 px-2 py-2 border-t border-white/5 last:border-b-0">
                                <span class="text-neutral-300">{{ spe.title }}</span>
                                <span class="font-bold text-white">
                                    {{ spe.value }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <div v-else class="flex items-center justify-center mt-[86px]">
        <div class="loader">
            <div class="loader_cube loader_cube--color"></div>
            <div class="loader_cube loader_cube--glowing"></div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { computed, onMounted, ref } from "vue"
import "swiper/css";
import IconArrowLeft from '@/common/icons/IconArrowLeft.vue';
import IconArrowRight from '@/common/icons/IconArrowRight.vue';
import "swiper/css/effect-coverflow";
import BaseButton from '@/common/UI/BaseButton.vue';
import "swiper/css/pagination";
import { useCar } from '@/stores/modules/car';
import { useRoute } from "vue-router";
import router from "@/router";
import { toast } from "vue3-toastify";
import { useHead } from '@vueuse/head'
import { getCurrentInstance } from 'vue'
let autoplay = ref(
    {
        delay: 1000
    }
);
const instance = getCurrentInstance()
const $axios = instance.appContext.config.globalProperties.$axios;
const store = useCar();
const route = useRoute();
const car = computed(() => store.car);
const modules = [EffectCoverflow, Pagination, Autoplay];
const coverflowConfig = {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
};
const swiperInstance = ref(null);
let loader = ref(false);
const onSwiper = (instance) => {
    swiperInstance.value = instance;
}

const next = () => {
    swiperInstance.value.slideNext();
}
const prev = () => {
    swiperInstance.value.slidePrev();
}
async function gotoLink(id) {
    loader.value = true;
    try {
        let res = await $axios.get(`/check-sale/${id}`);
        if (res.data.salePlan) {
            router.push(`/sales-plan/${res.data.salePlan.id}?car_id=${id}`);
        } else {
            toast.error("طرح فعالی برای این خودرو وجود ندارد");
        }
    } catch (error) {
        console.log(error);

    } finally {
        loader.value = false
    }
    // 
}
onMounted(async () => {
    await store.getCarDetailFromServer(route.params.id);
    useHead({
        title: `${car.value?.car.name} | جزئیات خودرو | تکین آراز پرگاس`,
        meta: [
            {
                name: 'description',
                content: car.value?.car.description || 'اطلاعات کامل خودرو وارداتی در مازندران'
            },
            {
                property: 'og:title',
                content: car.value?.car.name
            },
            {
                property: 'og:description',
                content: car.value?.car.description
            },
            {
                property: 'og:image',
                content: car.value ? `https://api.tap-car.ir/public/uploads/${car.value.car.image}` : ""
            },
            {
                property: 'og:url',
                content: `https://tap-car.ir/cars/${car.value?.car.id}`
            }
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://tap-car.ir/cars/${car.value?.car.id}`
            }
        ],
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": car.value?.car.name,
                    "image": car.value ? `https://api.tap-car.ir/public/uploads/${car.value.car.image}` : "",
                    "description": car.value?.car.description,
                    "sku": `CAR-${car.value?.car.id}`,
                    "brand": {
                        "@type": "Brand",
                        "name": car.value?.car.brand.title
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://tap-car.ir/cars/${car.value?.car.id}`,
                        "priceCurrency": "USD",
                        "price": car.value?.car.price,
                        "availability": "https://schema.org/InStock",
                        "itemCondition": "https://schema.org/NewCondition"
                    }
                })
            }
        ]
    })
})
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
        padding: 0 10px;
    }

    .custom-swiper :deep(.swiper-slide) {
        transform: scale(0.9);
    }

    .custom-swiper :deep(.swiper-slide-active) {
        transform: scale(1.05);
    }
}
</style>
<style>
.custom-swiper .swiper,
.custom-swiper .swiper-wrapper,
.custom-swiper .swiper-slide {
    height: 100%;
}

.custom-swiper .swiper-slide {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    opacity: 0.999;
    width: 100% !important;
    /* جلوگیری از flicker در بعضی مرورگرها */
}

.product-slide {
    width: 100%;
}

.slide-item {
    border-radius: 16px;
    overflow: hidden;
}

/* pagination bullets تم تیره/طلایی */
.custom-swiper :deep(.swiper-pagination-bullet) {
    width: 10px !important;
    height: 10px !important;
    background: rgba(255, 255, 255, 0.25) !important;
    opacity: 1 !important;
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.custom-swiper :deep(.swiper-pagination-bullet-active) {
    background: rgba(252, 211, 73, 1) !important;
    transform: scale(1.25);
}
</style>