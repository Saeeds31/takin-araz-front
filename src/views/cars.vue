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
                class="flex flex-col gap-4 border-1 border-black-300 p-2 rounded">
                <div class="flex flex-col gap-2">
                    <h3 class="font-bold border-b-2 border-b-blue-950">جستجو بر اساس</h3>
                    <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-center">
                            <label for="search">عنوان خودرو :</label>
                            <input type="text" class="border-2 border-b-blue-950 rounded p-2" name="search">
                        </div>
                        <div class="flex justify-between items-center">
                            <label for="min">کمترین قیمت (دلار):</label>
                            <input type="number" class="border-2 border-b-blue-950 rounded p-2" v-model="min" name="min"
                                @input="checkMin">
                        </div>
                        <div class="flex justify-between items-center">
                            <label for="max">بیشترین قیمت (دلار):</label>
                            <input type="number" class="border-2 border-b-blue-950 rounded p-2" v-model="max" name="max"
                                @input="checkMax">
                        </div>
                    </div>

                </div>

                <div class="flex flex-col gap-2">
                    <h3 class="font-bold border-b-2 border-b-blue-950">برند خودرو</h3>

                    <div v-for="(item, index) in filters.brands" :key="index"
                        class="flex cursor-pointer  items-center gap-1">
                        <input type="radio" :id="`brand${item.id}`" class="w-4 h-4 accent-amber-700" :value="item.id"
                            name="brand_id">
                        <label :for="`brand${item.id}`" class="cursor-pointer">{{ item.title }}</label>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <h3 class="font-bold border-b-2 border-b-blue-950">دسته بندی خودرو</h3>

                    <div v-for="(item, index) in filters.categories" :key="index"
                        class="flex cursor-pointer  items-center gap-1">
                        <input type="radio" :id="`category${item.id}`" class="w-4 h-4 accent-amber-700" :value="item.id"
                            name="category_id">
                        <label :for="`category${item.id}`" class="cursor-pointer">{{ item.title }}</label>
                    </div>
                </div>
                <div class="grid grid-cols-[3fr_1fr] gap-1">
                    <button type="submit" :class="{ 'disabled': loader }"
                        class="carBtn w-full text-center bg-base  border !text-white base-back-border rounded  md:px-4 md:py-3 px-2 py-1">
                        فیلتر سازی
                    </button>
                    <button type="button" @click="resetFilter()" :class="{ 'disabled': loader }"
                        class="carBtn w-full text-center bg-green-400   border !text-white rounded  md:px-4 md:py-3 px-2 py-1">
                        لغو
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
        background: white;
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