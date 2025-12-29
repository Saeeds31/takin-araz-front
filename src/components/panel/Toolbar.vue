<template>
  <div class="sticky top-0 z-10 bg-white">
    <div class="flex items-center gap-4 border-neutral-300 lg:px-4 py-2 rounded-xl lg:border">
      <!-- Toggle -->
      <BaseIconButton size="sm" :is-hover="true" @click="emit('expand')">
        <IconMenu />
      </BaseIconButton>

      <!-- Avatar -->
      <BaseAvatr :src="avatar" :active="isActive" />

      <!-- User-info -->
      <div class="flex flex-col gap-1">
        <p class="text-nowrap">{{ user?.full_name }}</p>
        <p>
          <span class="text-neutral-500 text-sm me-1">وضعیت: </span>
          <span class="text-md font-medium font-family-semi-bold text-nowrap" :class="[isActive ? 'text-emerald-500' : 'text-red-400']">
            {{ isActive ? "فعال" : "غیرفعال" }}
          </span>
        </p>
      </div>

      <!-- Balance -->
      <p class="self-end hidden lg:block">
        <span class="text-sm me-2">موجودی:</span>
        <span class="text-lg font-medium font-family-semi-bold me-2">{{ $filters.price(balance) }}</span>
        <span class="text-xs">تومان</span>
      </p>

      <div class="grow"></div>

      <!-- Datetime -->
      <div class="mx-6 hidden lg:block">
          <p class="text-neutral-500 text-sm mb-1 font-medium font-family-semi-bold">
            <span class="me-1 font-medium"> ساعت :</span>
            <span >{{ $filters.date(now, 'time') }}</span>
          </p>
          <p class="text-neutral-500 text-sm font-medium font-family-semi-bold">
            <span class="me-1 font-medium"> تاریخ :</span>
            <span >{{ $filters.date(now, 'date') }}</span>
          </p>
      </div>

      <!-- Actions -->
      <div class="items-center flex">
          <!-- <BaseIconButton class="hidden lg:flex" :is-hover="true">
              <IconBell />
          </BaseIconButton> -->
          <BaseIconButton :is-hover="true" @click="show = true">
              <IconLogout />
          </BaseIconButton>
      </div>
    </div>
  </div>

      <BaseModal v-model="show">
        <p class="text-center text-xl mb-4 mt-20 lg:mt-0">آیا می خواهید از برنامه خارج شوید ؟</p>

        <div class="flex justify-center items-center gap-2">
            <BaseButton @click="logout">خروج</BaseButton>
            <BaseButton @click="show = false" variant="outlined">انصراف</BaseButton>
        </div>
    </BaseModal>
</template>

<script setup>
import { computed, ref } from "vue";
import image from "@/assets/images/placeholder-image.png";
import BaseAvatr from "@/common/UI/BaseAvatr.vue";
import BaseIconButton from "@/common/UI/BaseIconButton.vue";
import IconBell from "@/common/icons/IconBell.vue";
import IconLogout from "@/common/icons/IconLogout.vue";
import IconMenu from "@/common/icons/IconMenu.vue";
import { useProfile } from "@/stores/modules/profile";
import { useModal } from "@/composables/useModal";
import BaseModal from "@/common/UI/BaseModal.vue";
import BaseButton from "@/common/UI/BaseButton.vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/modules/auth";

const emit = defineEmits(['expand']);

const store = useProfile();
const auth = useAuth();
const router = useRouter();

const now = ref(Date.now());

const show = ref(false);

const user = computed(() => store.user);
const balance = computed(() => user.value?.wallet?.balance || 0);
const avatar = computed(() => user.value?.image || image);
const isActive = computed(() => store.validity);

const logout = () => {
  auth.logout();
  router.push({ name: 'Check' });
}

</script>
