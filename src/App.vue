<template>
    <IndexLayout>
        <RouterView></RouterView>
    </IndexLayout>
    <a target="_blank" href="https://wa.me/+989039431683" class="fixed right-4 bottom-4">
        <IconWhatsapp />
    </a>
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