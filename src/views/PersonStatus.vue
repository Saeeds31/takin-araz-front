<template>
    <div>
        <div class="flex items-center gap-4 mb-8">
            <BaseSwitch v-model="is_active" class="pointer-events-none"/>
            
            <p>
                <span class="text-sm me-1">وضعیت: </span>
                <span class="text-md font-family-semi-bold text-nowrap" :class="[is_active ? 'text-emerald-500' : 'text-red-400']">
                    {{ is_active ? "فعال" : "غیرفعال" }}
                </span>
            </p>

            <BaseButton @click="renewalRequest" v-if="!validity">درخواست تمدید اشتراک</BaseButton>
        </div>

        <p class="mb-8">
            <span class="text-sm me-3 text-nowrap font-family-semi-bold">تاریخ پایان اشتراک:</span>
            <span class="text-sm font-family-semi-bold">{{ $filters.date(validity?.to_date, 'date') }}</span>
        </p>
    </div>
</template>

<script setup>
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseSwitch from '@/common/UI/BaseSwitch.vue';
import { useProfile } from '@/stores/modules/profile';
import { computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify';

const store = useProfile();

const validity = computed(() => store.getValidity);
const is_active = computed(() => validity.value ? true : false);

const renewalRequest = () => {
    toast.success('درخواست ارسال شد')
}

onMounted(async () => {
    await store.userValidity()
})

</script>

<style scoped></style>