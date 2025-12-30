<template>
    <IndexLayout>
        <RouterView></RouterView>
    </IndexLayout>

    <BaseLoading />
</template>

<script setup>
import BaseLoading from '@/common/UI/BaseLoading.vue';
import IndexLayout from '@/layouts/IndexLayout.vue';
import IconWhatsapp from '@/common/icons/IconWhatsapp.vue';
import { useProfile } from '@/stores/modules/profile';
import { useBanner } from '@/stores/modules/banner';
import { computed, onMounted } from 'vue';
const store = useProfile();
const store1 = useBanner();
let banners = computed(() => {
    return store1.banners;
})
onMounted(() => {
    store.fetchSettingsFromServe();
    if (!banners.value.length)
        store1.getBannersFromServer();
})
</script>