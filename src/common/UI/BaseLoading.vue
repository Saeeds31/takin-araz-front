<template>
    <Teleport to="body" v-if="loading">
        <div class="fixed flex items-center justify-center inset-0 bg-black/50 z-999">
            <IconSpinner/>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import IconSpinner from '@/common/icons/IconSpinner.vue';
import { useLoading } from '@/stores/modules/loading';

const { loading } = useLoading();

</script>

<style scoped></style>