<template>
  <div class="mt-20">
    <h2 class="mb-10 text-2xl font-family-bold text-center">تیم تکین آرتا پرگاس</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <template v-for="team in teams.slice(0,4)" :key="team.id">
        <div class="border border-gray-300 rounded-xl overflow-hidden relative">
          <img class="w-full h-full object-cover" :src="$filters.resource(team.image)" :alt="team.full_name">

          <div class="absolute bottom-0 start-0 end-0 px-2 pb-2 lg:px-4 lg:pb-4">
            <div class="bg-black/15 backdrop-blur-xs rounded-xl px-4 py-4">
              <h6 class="text-center text-white mb-2 font-family-bold text-sm lg:text-lg">{{ team.full_name }}</h6>
              <p class="text-center text-white font-family-regular text-xs lg:text-sm">{{ team.post }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useTeam } from '@/stores/modules/team';
const store = useTeam();
const teams = computed(() => {
  return store.team;
})
onMounted(() => {
  if (!teams.value.length) {
    store.getTeamFromServer()
  }
})
</script>

<style scoped></style>
