<template>
    <nav>
        <ul class="flex items-center gap-4">
            <li v-for="(item, index) in list" :key="index">
                <a :href="item.link">
                    {{ item.title }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const props = defineProps({
    list: Array
})
</script>

<style scoped></style>