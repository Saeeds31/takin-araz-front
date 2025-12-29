<template>
    <div class="relative mb-4">
        <BaseFieldset :legend="'انتخاب استان'" :state="state" class="py-1!">
            <Multiselect v-model="selectedProvince" :options="provinces" :allow-empty="false" :searchable="false"
                :placeholder="'استان محل سکونت'" :select-label="''" trackBy="id" label="name" :deselect-label="''"
                :selected-label="'انتخاب شده'">
            </Multiselect>
        </BaseFieldset>
    </div>

    <div class="relative mb-4">
        <BaseFieldset :disabled="loader" :legend="'انتخاب شهر'" :state="state" class="py-1!">
            <Multiselect v-model="value" :options="cities" trackBy="id" label="name" :allow-empty="false"
                :searchable="false" :placeholder="'شهر محل سکونت'" :select-label="''" :deselect-label="''"
                :selected-label="'انتخاب شده'">
            </Multiselect>
        </BaseFieldset>
        <span class="block text-xs text-red-600 px-2 mt-1">
            {{ errorMessage }}
        </span>
    </div>
</template>
<script setup>
import Multiselect from 'vue-multiselect';
import BaseFieldset from '@/common/UI/BaseFieldset.vue';
import { computed, onMounted, ref, watch } from 'vue'
import { useField } from 'vee-validate';
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const $axios = instance.appContext.config.globalProperties.$axios;
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true
    }
});
let selectedProvince = ref(null);
let provinces = ref([]);
let cities = ref([]);
let loader = ref(false);
const state = computed(() => {
    if (errorMessage.value) return 'error';
    if (meta.valid) return 'success';
    return 'default';
});
watch(() => selectedProvince.value, () => {
    getCities();
}, { deep: true })
watch(() => props.user, () => {
    fillData();
}, { deep: true })
function fillData() {
    if (props.user && props.user.city)
        selectedProvince.value = provinces.value.find((prov) => prov.id == props.user.city.province_id);
}
async function getProvinces() {
    let res = await $axios.get("/provinces");
    provinces.value = res.data.data;
}
async function getCities() {
    loader.value = true;
    try {
        let res = await $axios.get("/cities", {
            params: { province_id: selectedProvince.value.id }
        }
        );
        cities.value = res.data.data.data;
        if (props.user && props.user.city) {
            let hasInCity = cities.value.find((city) => city.id == props.user.city_id)
            if (hasInCity) {
                value.value = props.user.city;
            } else {
                value.value = null;
            }
        }

    } catch (error) {
        console.log(error);
    } finally {
        loader.value = false;
    }
}
const { value, errorMessage, meta } = useField(() => props.name);
onMounted(() => {
    getProvinces();
})

</script>