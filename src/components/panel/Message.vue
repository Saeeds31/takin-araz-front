<template>
    <form @submit.prevent="submit">
        <div class="mb-4 flex items-center gap-4">
            <span class="text-sm font-family-semi-bold">ارسال پیام به:</span>
            <BaseRadioGroup v-model="message.receiver_id" :options="supervisors" label-by="name" />
        </div>

        <BaseCard class="mb-4">
            <h6 class="text-sm font-family-semi-bold mb-2">موضوع پیام :</h6>
            <input v-model="message.subject" type="text" placeholder="موضوع..." class="w-full px-2 py-1 outline-0">
        </BaseCard>

        <BaseCard class="mb-4">
            <h6 class="text-sm font-family-semi-bold mb-2">توضیحات :</h6>
            <input v-model="message.body" type="text" placeholder="متن پیام..." class="w-full px-2 py-1 outline-0">
        </BaseCard>

        <BaseCard class="mb-4">
            <h6 class="text-sm font-family-semi-bold mb-2">فایل ضمیمه:</h6>
            <FileUpload v-model="message.attached_file" :multi="true" />
        </BaseCard>

        <div class="flex justify-end mb-4">
            <BaseButton :disabled="loading" type="submit">ارسال پیام</BaseButton>
        </div>
    </form>
</template>

<script setup>
import FileUpload from '@/common/components/FileUpload.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseRadioGroup from '@/common/UI/BaseRadioGroup.vue';
import { isEmpty } from '@/common/utils/helpers';
import { useErrors } from '@/composables/useError';
import { useMessage } from '@/stores/modules/message';
import { computed, onMounted, reactive, ref } from 'vue'

const store = useMessage();
const { displayError } = useErrors();

const loading = computed(() => store.loading);
const supervisors = computed(() => store.supervisors);

const message = reactive({
    subject: null,
    body: null,
    receiver_id: null,
    attached_file: [],
});

const submit = async () => {    
    
    if (isEmpty(message)) return;

    try {
        const fd = new FormData();

        for (const key in message) {
            fd.append(key, key == 'attached_file' ? message[key][0] : message[key]);
        }

        await store.send(fd);
        store.load();
    } catch (error) {
        displayError(error);
    }

}

onMounted(async () => {
    await store.supervisor();
})

</script>

<style scoped></style>