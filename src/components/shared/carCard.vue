<template>
    <div
        class="group relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 hover:scale-[1.02] transition-all duration-500">
        <!-- تصویر خودرو -->
        <div class="relative">
            <img v-lazy="$filters.resource(car.image)" :alt="car.name"
                class="w-full h-60 object-cover opacity-90 group-hover:opacity-100 transition duration-500" />

            <!-- دسته‌بندی -->
            <span
                class="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {{ car.category?.title }}
            </span>

            <!-- گرادیانت تیره روی تصویر -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <!-- اطلاعات -->
        <div class="p-6 space-y-5">
            <h2 class="lg:text-xl text-sm font-extrabold tracking-tight min-h-[56px]">
                {{ car.name }}
            </h2>

            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-400 font-medium">قیمت به دلار</p>
                <p class="text-yellow-400 font-bold text-lg">
                    ${{ car.price.toLocaleString() }}
                </p>
            </div>

            <!-- دکمه‌ها -->
            <div class="flex flex-col items-center sm:flex-row gap-3 pt-2">

                <!-- مشاهده جزئیات -->
                <router-link :to="`/cars/${car.id}`"
                    class="w-full flex-1 inline-flex justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold px-2 py-1 rounded-full shadow-[0_8px_25px_rgba(234,179,8,0.3)] transition-all duration-300">
                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <span class="text-sm">
                        مشاهده جزئیات

                    </span>

                </router-link>

                <!-- درخواست ثبت خودرو -->
                <a @click="saleCar(car.id)"
                    class="w-full  flex-1 inline-flex justify-center items-center gap-2 border border-yellow-400/60 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-2 py-1 rounded-full transition-all duration-300 backdrop-blur-md">
                    ثبت خودرو
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 13l4-4 4 4m0 0l4-4 4 4M7 9v12m8-12v12" />
                    </svg>
                </a>

            </div>
        </div>

        <!-- افکت نور طلایی پس‌زمینه -->
        <div class="absolute -top-10 -left-10 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none">
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['handlerCar'])
const props = defineProps({
    car: Object,
    salemode: {
        type: Boolean,
        default: false
    }
})
function saleCar(id) {
    emit('handlerCar', id)
}
</script>