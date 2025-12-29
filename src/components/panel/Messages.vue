<template>
    <h6 class="font-family-semi-bold text-sm mb-2 px-2">پیام ها :</h6>
    <div class="flex flex-col gap-2">

        <template v-for="(message, index) in messages" :key="index">
            <BaseCard variant="filled" :mode="message.response ? 'success' : 'primary'" class="mb-4">
                <div class="flex flex-col items-start gap-3">
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">وضعیت پیام:</h6>
                        <p class="text-xs">{{ message.response ? 'پاسخ داده شده' : 'در حال بررسی' }}</p>
                    </div>
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">موضوع پیام:</h6>
                        <p class="text-xs">{{ message.subject }}</p>
                    </div>
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">متن پیام:</h6>
                        <p class="text-xs">{{ message.body }}</p>
                    </div>
                    <div>
                        <h6 class="font-family-semi-bold text-sm mb-1">پاسخ پیام:</h6>
                        <p class="text-xs">{{ message.response }}</p>
                    </div>

                </div>
            </BaseCard>
        </template>
    </div>
</template>

<script setup>
import BaseAvatr from '@/common/UI/BaseAvatr.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import { useErrors } from '@/composables/useError';
import { useMessage } from '@/stores/modules/message';
import { computed, onMounted, ref } from 'vue'

const store = useMessage();
const { displayError } = useErrors();

const messages = computed(() => store.messages);

const init = async () => {
    try {
        await store.load();
    } catch (error) {
        displayError(error);
    }
}

onMounted(async () => {
    await init();
});
</script>

<style scoped></style>