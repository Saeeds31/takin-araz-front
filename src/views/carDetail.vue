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
                <router-link to="#">
                    خودروها
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
    <main class="grid lg:grid-cols-[2fr_1fr] grid-cols-1 gap-4 items-start w-screen px-[5%] mt-8" v-if="car">
        <section>
            <section class="w-full items-center mx-auto grid lg:grid-cols-2 grid-cols-1 gap-6 ">
                <div class="flex flex-col items-start gap-3  px-6 py-4 rounded-xl">
                    <h1 class="font-bold text-3xl pb-3 border-b w-full border-b-base">
                        {{ car.car.name }}
                    </h1>
                    <h3 class="flex items-center justify-between w-full gap-3">
                        <span>نوع ماشین:</span>
                        <span class="font-bold">{{ car.car.category?.title }}</span>
                    </h3>

                    <h3 class="flex items-center justify-between  w-full gap-3">
                        <span>برند:</span>
                        <span class="font-bold">{{ car.car.brand?.title }}</span>
                    </h3>

                    <h3 class="flex items-center justify-between  w-full gap-3">
                        <span>قیمت:</span>
                        <span class="font-bold">{{ Number(car.car.price).toLocaleString('fa') }}دلار</span>
                    </h3>
                    <div class="w-full flex items-center justify-between mt-6 gap-4">
                        <q class="base-color">باتوجه به نوسان قیمت بازار
                            <br>
                            ارقام تقریبی وارد شده است</q>
                        <BaseButton :disabled="loader" @click="gotoLink(car.car.id)" class=" base-back">
                            پیش ثبت نام
                        </BaseButton>
                    </div>
                </div>
                <img class="w-full  rounded-xl" v-lazy="$filters.resource(car.car.image)" />
            </section>
            <section v-if="car.car.images && car.car.images.length" class="w-full mt-8">
                <h3 class="font-bold text-2xl mb-4">سایر تصاویر</h3>
                <Swiper :modules="modules" :autoplay="autoplay" :loop="true" :centered-slides="true" :grab-cursor="true"
                    :speed="700" :slides-per-view="2.4" :space-between="0" :effect="'coverflow'"
                    :coverflow-effect="coverflowConfig" :pagination="{ clickable: true }"
                    class="w-[80%] mx-auto  custom-swiper  mt-0 xl:mt-12">
                    <SwiperSlide v-for="(slide, i) in car.car.images" :key="i" class="product-slide">
                        <div class="slide-item">
                            <img class="w-full" v-lazy="$filters.resource(slide.path)" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
            <div class="mt-6 whitespace-pre-line">
                {{ car.car.description }}
            </div>
        </section>
        <section v-if="car.specifications">
            <div v-for="(item, index) in car.specifications" :key="index"
                class="mt-6 border base-back-border p-4 rounded-2xl flex flex-col items-start gap-3">
                <q class="font-bold text-xl">{{ item.group_title }}</q>
                <ul class="w-full">
                    <li v-for="(spe, index) in item.rows" :key="index"
                        class="flex w-full justify-between items-center text-black gap-4 px-6">
                        <span>{{ spe.title }}</span>
                        <span class="font-bold">{{ spe.value }}</span>
                    </li>
                </ul>
            </div>
        </section>
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
let loader = ref(false);
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
                content: car.value ? `https://api.car-tap.ir/public/uploads/${car.value.car.image}` : ""
            },
            {
                property: 'og:url',
                content: `https://car-tap.ir/cars/${car.value?.car.id}`
            }
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://car-tap.ir/cars/${car.value?.car.id}`
            }
        ],
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": car.value?.car.name,
                    "image": car.value ? `https://api.car-tap.ir/public/uploads/${car.value.car.image}` : "",
                    "description": car.value?.car.description,
                    "sku": `CAR-${car.value?.car.id}`,
                    "brand": {
                        "@type": "Brand",
                        "name": car.value?.car.brand.title
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://car-tap.ir/cars/${car.value?.car.id}`,
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