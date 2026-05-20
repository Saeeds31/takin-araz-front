<template>
    <PanelLayout>
        <SideNavigation  />

        <div class="ps-0 transition-all duration-300 h-full overflow-y-auto hide-scroll"
            :class="{ 'lg:ms-72': !expanded, 'lg:ps-8': !expanded }">
            <div class="mt-4 pt-2">
                <RouterView></RouterView>
            </div>
        </div>
    </PanelLayout>


</template>

<script setup>
import SideNavigation from '@/components/panel/SideNavigation.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
import { useProfile } from '@/stores/modules/profile';
import { onMounted, onUnmounted, ref, watch } from 'vue'
const store = useProfile();
onMounted(async () => {
    await store.fetchSettingsFromServe();
});

</script>

<style scoped></style>