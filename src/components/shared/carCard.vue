<template>
    <article class="flex flex-col py-2 px-2 rounded items-center gap-4 border border-gray-600 ">
        <img v-lazy="$filters.resource(car.image)" class="w-full rounded aspect-6/4 object-cover" :alt="car.name">
        <h2 class="font-bold my-3 text-right w-full">
            {{ car.name }}
        </h2>
        <h4 class="flex items-center justify-between w-full">
            <span>نوع ماشین:</span>
            <span class="font-bold">
                {{ car.category?.title }}
            </span>
        </h4>
        <h3 class="flex items-center justify-between w-full">
            <span>قیمت:</span>
            <span class="font-bold">
                {{ Number(car.price).toLocaleString('fa') }} دلار
            </span>
        </h3>
        <router-link
            class="carBtn w-full text-center bg-base  border !text-white base-back-border rounded  md:px-4 md:py-3 px-2 py-1"
            :to="`/cars/${car.id}`">
            مشاهده مشخصات
        </router-link>

        <a @click="saleCar(car.id)" v-if="salemode"
            class="carBtn w-full text-center bg-base  border !text-white base-back-border rounded  md:px-4 md:py-3 px-2 py-1">
            ثبت درخواست
        </a>
    </article>
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
<style>
.carBtn:hover {
    transition: all 0.8s;
    box-shadow: 0 0 5px rgba(34, 17, 34, 0.627);
    transform: scale(1.015);
}
</style>