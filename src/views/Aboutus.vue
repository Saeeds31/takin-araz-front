<template>
    <div>
        <p class="text-sm text-gray-400">درباره ما</p>
    </div>
  <Aboutus />
  <WhatWeDo />
  <Team />
</template>

<script setup>
import Aboutus from "@/components/home/Aboutus.vue";
import Team from "@/components/home/Team.vue";
import WhatWeDo from "@/components/home/WhatWeDo.vue";
import { ref } from "vue";
</script>

<style scoped></style>
