<template>
    <nav class="w-[90vw] mx-auto" v-if="cars">
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


            <li v-if="brand" class="flex items-center gap-2">
                <router-link class="flex items-center gap-1" to="#">
                    <span>
                        برند
                    </span>
                    <span class="font-bold">
                        {{ brand.title }}
                    </span>
                </router-link>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="iconify iconify--bxi bxi text-neutral-40 dark:text-neutral-60" width="1"
                    height="1" viewBox="0 0 24 24" style="font-size: 1rem; width: 1rem; height: 1rem;">
                    <path d="M15.71,7.41l-4.59,4.59,4.59,4.59-1.41,1.41-6-6,6-6,1.41,1.41Z" fill="currentColor">
                    </path>
                </svg>
            </li>
            <li v-if="category" class="flex items-center gap-2">
                <router-link class="flex items-center gap-1" to="#">
                    <span>
                        دسته
                    </span>
                    <span class="font-bold">
                        {{ category.title }}
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
                <router-link to="/cars">
                    خودروها
                </router-link>
            </li>


        </ul>
    </nav>
    <main class="grid w-screen lg:grid-cols-[1fr_3fr] grid-cols-1 gap-4 items-start  px-[5%] mt-8" v-if="cars">
        <template v-if="showFilter">
            <form v-if="filters" @submit.prevent="filterCars" id="filters"
                class="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10">
                <!-- فیلد جستجو -->
                <div class="mb-6 pb-4 border-b border-b-white/10">
                    <h3 class="font-extrabold text-lg text-yellow-400 mb-3 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-6-6m2-5a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        جستجو
                    </h3>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-1">
                            <label for="search" class="text-sm text-gray-300">عنوان خودرو :</label>
                            <input type="text" name="search" id="search"
                                class="bg-black/70 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition duration-300" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="min" class="text-sm text-gray-300">کمترین قیمت (دلار):</label>
                            <input type="number" v-model="min" @input="checkMin" name="min" id="min"
                                class="bg-black/70 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition duration-300" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="max" class="text-sm text-gray-300">بیشترین قیمت (دلار):</label>
                            <input type="number" v-model="max" @input="checkMax" name="max" id="max"
                                class="bg-black/70 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition duration-300" />
                        </div>
                    </div>
                </div>

                <!-- فیلتر برند -->
                <div class="mb-6 pb-4 border-b border-b-white/10">
                    <h3 class="font-extrabold text-lg text-yellow-400 mb-3 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 13l1.394 1.394c-.273.852-.447 1.776-.447 2.778v1M8 13a4 4 0 110 8m0-8a4 4 0 100 8m-8-5a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75zm12.75 0h2.75a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-2.75a.75.75 0 00-.75.75v4.5a.75.75 0 00.75.75z" />
                        </svg>
                        برند
                    </h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="(item, index) in filters.brands" :key="index"
                            class="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition duration-300">
                            <input type="radio" :id="`brand${item.id}`" class="w-4 h-4 accent-amber-700 rounded-full"
                                :value="item.id" name="brand_id">
                            <label :for="`brand${item.id}`" class="cursor-pointer flex-grow">{{ item.title }}</label>
                        </div>
                    </div>
                </div>

                <!-- فیلتر دسته بندی -->
                <div>
                    <h3 class="font-extrabold text-lg text-yellow-400 mb-3 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 4.5l7.5 6 3.75-4.5c.506-.405 1.213-.385 1.71.03L19.5 7.5m-1.5 4.5h4.5m-4.5 1.5v1.5m-15 0h15m-7.5-6v7.5" />
                        </svg>
                        دسته بندی
                    </h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="(item, index) in filters.categories" :key="index"
                            class="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition duration-300">
                            <input type="radio" :id="`category${item.id}`" class="w-4 h-4 accent-amber-700 rounded-full"
                                :value="item.id" name="category_id">
                            <label :for="`category${item.id}`" class="cursor-pointer flex-grow">{{ item.title }}</label>
                        </div>
                    </div>
                </div>

                <!-- دکمه‌ها -->
                <div class="grid grid-cols-2 gap-3 mt-8">
                    <button type="submit" :disabled="loader"
                        class="carBtn group relative inline-flex items-center justify-center overflow-hidden px-4 py-2.5 rounded-full font-semibold text-white transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed">
                        <span
                            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 origin-left transform scale-x-0 group-hover:scale-x-100">
                            فیلتر کردن
                        </span>
                        <span
                            class="flex items-center gap-2 transition-colors duration-300 group-hover:text-transparent">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 13.5L12 20.25l-7.5-6.75M19.5 4.5l-7.5 6.75L4.5 4.5" />
                            </svg>
                            فیلتر
                        </span>
                    </button>
                    <button type="button" @click="resetFilter" :disabled="loader"
                        class="carBtn group relative inline-flex items-center justify-center overflow-hidden px-4 py-2.5 rounded-full font-semibold text-black transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-400 hover:bg-yellow-500">
                        <span
                            class="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 origin-left transform scale-x-0 group-hover:scale-x-100">
                            لغو فیلتر
                        </span>
                        <span
                            class="flex items-center gap-2 transition-colors duration-300 group-hover:text-transparent">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            لغو
                        </span>
                    </button>
                </div>
            </form>
        </template>
        <section id="carsBox">
            <section id="buttons"
                class="flex lg:flex-row flex-col lg:items-center lg:items-start gap-2 mb-3 justify-between mb-1.5">
                <div class="flex items-center lg:border-b-none border-b-2 border-b-blue-950 justify-between gap-2">
                    <h3 class="font-bold lg:border-b-2 border-b-blue-950">مرتب سازی بر اساس</h3>
                    <button class="bg-blue-900 text-white px-2 py-1 lg:hidden block" @click="showFilter = true">
                        فیلترهای بیشتر
                    </button>
                </div>
                <div class="flex gap-2">
                    <button @click="sort('newest')" :class="{ 'bg-amber-600': route.query.sort == 'newest' }"
                        class="bg-amber-900 text-white rounded py-2 px-4 hover:bg-amber-600 cursor-pointer">جدیدترین</button>
                    <button @click="sort('expensive')" :class="{ 'bg-amber-600': route.query.sort == 'expensive' }"
                        class="bg-amber-900 text-white rounded py-2 px-4 hover:bg-amber-600 cursor-pointer">گران
                        ترین</button>
                    <button @click="sort('cheap')" :class="{ 'bg-amber-600': route.query.sort == 'cheap' }"
                        class="bg-amber-900 text-white rounded py-2 px-4 hover:bg-amber-600 cursor-pointer">ارزان
                        ترین</button>
                </div>
            </section>
            <section id="cars" class="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1">
                <carCard :car="car" v-for="(car, index) in cars" :key="index" />

            </section>
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
import { computed, onMounted, ref, watch } from "vue"
import { useCar } from '@/stores/modules/car';
import { useRoute, useRouter } from "vue-router";
import { useHead } from '@vueuse/head'
import carCard from '@/components/shared/carCard.vue';
import { filter } from "jszip";
const store = useCar();
const route = useRoute();
const router = useRouter();
const cars = computed(() => store.cars);
const brand = computed(() => store.brand);
const category = computed(() => store.category);
const filters = computed(() => store.filters);
let loader = ref(false);
let min = ref(null);
let max = ref(null);
let showFilter = ref(true);

function sort(sort) {
    let query = { ...route.query };
    query.sort = sort;
    router.replace({ name: route.name, query: query })
    getData(query)
}
function checkMin(e) {
    if (min.value < filters.value.min) e.preventDefault();
}
function checkMax(e) {
    if (max.value > filters.value.max) e.preventDefault();
}
function resetFilter() {
    if (window.innerWidth < 999) {
        showFilter.value = false;
    }
    getData({})
    router.push({ name: route.name })
}
async function filterCars() {
    let form = document.forms['filters'];
    let query = {
    }
    if (form['min'].value) {
        query.min = form['min'].value;
    }

    if (form['max'].value) {
        query.max = form['max'].value;
    }
    if (form['search'].value) {
        query.search = form['search'].value;
    }
    if (form['category_id'].value) {
        query.category_id = form['category_id'].value;
    }
    if (form['brand_id'].value) {
        query.brand_id = form['brand_id'].value;
    }
    router.replace({ name: route.name, query: query })
    getData(query);
}
async function getData(query) {
    if (window.innerWidth < 990) {
        showFilter.value = false;
    }
    loader.value = true;
    try {
        await store.getCarsFromServer(query);
    } catch (error) {
    } finally {
        loader.value = false;
    }
}

onMounted(async () => {
    window.addEventListener('resize', () => {
        if (window.innerWidth < 990) {
            showFilter.value = false;
        } else {
            showFilter.value = true;

        }
    })
    store.getCarsFilterFromServer();
    getData(route.query);

    useHead({
        title: `${brand.value ? brand.value.title : category.value ? category.value.title : ''}   لیست خودرو   تاپ کار`,
        meta: [
            {
                name: 'description',
                content: brand.value ? brand.value.description : category.value ? category.value.description : ''
            },
            {
                property: 'og:title',
                content: brand.value ? brand.value.title : category.value ? category.value.title : ''
            },
            {
                property: 'og:description',
                content: brand.value ? brand.value.description : category.value ? category.value.description : ''
            },
            {
                property: 'og:image',
                content: brand.value ? `https://api.tap-car.ir/public/uploads/${brand.value?.image}` : ""
            },
            {
                property: 'og:url',
                content: `https://tap-car.ir/cars`
            }
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://tap-car.ir/cars`
            }
        ],
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": brand.value ? brand.value.title : category.value ? category.value.title : '',
                    "image": brand.value ? `https://api.tap-car.ir/public/uploads/${brand.value.image}` : "",
                    "description": brand.value ? brand.value.description : category.value ? category.value.description : '',
                    "brand": {
                        "@type": "Brand",
                        "name": brand.value?.car.brand.title
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://tap-car.ir/cars`,
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
@media (max-width:990px) {
    form#filters {
        position: fixed;
        inset: 0;
        z-index: 10000;
        overflow: scroll;
    }
}

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

button.disabled {
    pointer-events: none;
    opacity: 0.2;
}
</style>