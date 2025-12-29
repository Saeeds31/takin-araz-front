<template>
    <section class="px-4 py-4">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-4">
            <img :src="$filters.resource(course?.image)" :alt="course?.title" class="rounded-md">
        </div>

        <BaseCard variant="filled" class="mb-4">
            <h6 class="font-semibold text-md mb-2">موضوع دوره :</h6>
            <h2>{{ course?.title }}</h2>
        </BaseCard>
        <BaseCard variant="filled" class="mb-4">
            <h6 class="font-semibold text-md mb-2"> توضیحات :</h6>
            <p class="text-neutral-500 text-sm text-justify leading-6" v-html="$sanitize(course?.description)"></p>
        </BaseCard>
        <BaseCard variant="filled" mode="primary" class="mb-4" v-if="purchase">
            <h6 class="font-semibold text-md mb-3"> وضعیت پرداخت :</h6>
            <div class="flex items-center flex-wrap justify-between">
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">هزینه دوره :</span>
                    <span class="ms-2 text-gray-800">{{ $filters.price(purchase?.cost) }}</span>
                    <span class="text-xs ms-1 text-gray-800">تومان</span>
                </div>
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">مبلغ پرداخت شده :</span>
                    <span class="ms-2 text-gray-800">{{ $filters.price(purchase?.paid_cost) }}</span>
                    <span class="text-xs ms-1 text-gray-800">تومان</span>
                </div>
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">مانده بدهی :</span>
                    <span class="ms-2 text-gray-800">{{ $filters.price(purchase?.debt_balance) }}</span>
                    <span class="text-xs ms-1 text-gray-800">تومان</span>
                </div>
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">وضعیت پرداخت :</span>
                    <span class="ms-2 text-gray-800 text-sm">{{ getPayStatus(purchase?.pay_status) }}</span>
                </div>
            </div>
            <BaseButton class="mr-auto mt-6" :disabled="loading" v-if="purchase && purchase.pay_status == 'debtor'"
                @click="debtPay()">پرداخت اقساط
            </BaseButton>

        </BaseCard>
        <BaseCard variant="filled" mode="primary" class="mb-4" v-if="exam_result && exam_result.length">
            <h6 class="font-semibold text-md mb-3"> نتایج آزمون :</h6>
            <div v-for="(item, index) in exam_result" :key="index" class="flex items-center flex-wrap justify-between">
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">دفعات آزمون :</span>
                    <span class="ms-2 text-gray-800">
                        {{ index + 1 }}
                    </span>
                </div>
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">نتیجه آزمون :</span>
                    <span class="ms-2 font-bold text-gray-800"
                        :class="item.status == 'rejected' ? 'text-red-500' : 'text-green-500'">
                        {{ item.status == 'rejected' ? 'رد شده' : 'قبول شده' }}
                    </span>
                </div>
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">نمره آزمون :</span>
                    <span class="ms-2 text-gray-800">{{ item.score }}</span>
                </div>
                <div class="mb-3 md:mb-0">
                    <span class="font-family-semi-bold text-sm">تعداد غلط ها :</span>
                    <span class="ms-2 text-gray-800">{{ item.false_count }}</span>
                </div>

            </div>
        </BaseCard>
        <div class="flex items-center gap-2 mb-4">
            <span>تعداد جزوه: </span>
            <span class="font-bold">{{ course?.brochures?.length || 0 }}</span>
        </div>

        <BaseCard variant="filled" class="mb-4" v-if="course?.brochures?.length">
            <div class="flex items-baseline justify-between mb-4">
                <h6 class="font-semibold text-md">جزوات {{ course?.title }}:</h6>
                <!-- <BaseButton variant="outlined" @click="downloadFiles(course.brochures)">دانلود بصورت یکجا</BaseButton> -->
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <template v-for="(brochure, index) in course.brochures" :key="brochure.id">
                    <div class="flex items-center gap-2">
                        <span class="text-sm">{{ marker(index) }}</span>
                        <span
                            class="grow border border-neutral-300 bg-white text-neutral-500 text-md rounded-md px-2.5 py-2.5">{{
                                brochure?.title }}</span>

                        <BaseButton :disabled="loading" @click="downloadFile(brochure)">
                            <IconPdf color="#ffffff" />
                        </BaseButton>

                    </div>
                </template>
            </div>
        </BaseCard>

        <div class="flex items-center justify-between mb-4">
            <BaseButton :disabled="loading" v-if="!purchase" @click="pay">خرید دوره</BaseButton>
            <BaseButton :disabled="loading" v-else-if="purchase && purchase.allow_to_exam" @click="gotoExam()">شروع
                آزمون
            </BaseButton>
            <BaseButton :disabled="loading" v-else @click="retest()">درخواست آزمون مجدد</BaseButton>
        </div>

        <div>
            <p class="text-neutral-500 text-sm mb-2">پس از خریداری دوره ، آزمون اول رایگان می باشد برای <span
                    class="text-blue-500">شروع</span> آزمون کافی است <span class="text-blue-500">دکمه ی شروع
                    آزمون</span> کلیک
                کنید </p>
            <p class="text-neutral-500 text-sm">درصورت <span class="text-red-500">کسب نکردن</span> نمره قابل قبول ، برای
                <span class="text-red-500">آزمون مجدد</span> باید <span class="text-red-500">درخواست آزمون مجدد</span>
                را
                انتخاب کنید, و مبلغ <span class="text-red-500">
                    {{ settings ? Number(settings.re_test_fee).toLocaleString("fa") + "تومان" : "" }}
                </span> از کیف پول شما کسر خواهد شد
            </p>
        </div>
    </section>


    <BaseModal v-model="show">
        <div class="flex items-center justify-between mb-4">
            <h6 class="font-family-semi-bold text-xl">
                {{ selectedPay == 'debt' ? 'پرداخت اقساط' : 'خرید دوره' }}
            </h6>
            <BaseIconButton :is-hover="true" @click="show = false">
                <IconClose />
            </BaseIconButton>
        </div>

        <div v-if="selectedPay != 'debt'" class="mb-9">
            <p class="text-md text-gray-800 mb-2"> انتخاب شیوه پرداخت :</p>
            <BaseRadioGroup v-model="selected" :options="paytypes" track-by="value" label-by="name"></BaseRadioGroup>
        </div>


        <div>
            
            <Form ref="form" @submit="gateway" :validation-schema="schema" v-slot="{ meta }">
                <FormInput type="price" label="مبلغ پرداختی" dir="ltr" name="paid_cost" />
                <BaseButton class="w-full" type="submit" :disabled="!meta.valid || isRedirect">
                    <span v-if="isRedirect">در حال پرداخت </span>
                    <span v-else>پرداخت </span>
                </BaseButton>
            </Form>
        </div>
        <p v-if="selected === 'installments'" class="text-sm text-gray-800 mt-4 px-2">حداقل مبلغ قابل پرداخت به عنوان
            اولین
            قسط</p>
    </BaseModal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import BaseCard from '@/common/UI/BaseCard.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import BaseIconButton from '@/common/UI/BaseIconButton.vue';
import IconPdf from '@/common/icons/IconPdf.vue';
import { useCourse } from '@/stores/modules/course';
import { useProfile } from '@/stores/modules/profile';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import BaseModal from '@/common/UI/BaseModal.vue';
import BaseRadioGroup from '@/common/UI/BaseRadioGroup.vue';
import { useErrors } from '@/composables/useError';
import IconClose from '@/common/icons/IconClose.vue';
import FormInput from '@/common/components/FormInput.vue';
import { Form, useField } from 'vee-validate';

import { number, object } from 'yup';
import { isEmpty } from '@/common/utils/helpers';
const { value, errorMessage, meta } = useField(() => 'paid_cost');

const store = useCourse();
const store1 = useProfile();
const { displayError } = useErrors();
const { params } = useRoute();
const { push } = useRouter();
function downloadFile(file) {
    if (!purchase.value) return;
    window.open(import.meta.env.VITE_BASE_RESOURCE_URL + file.file, '_blank');
}
var selectedPay = ref("init");
const selected = ref('cash');
const form = ref(null);
const isRedirect = ref(false);
const show = ref(false);
const getPayStatus = (value) => {
    if (!value) return "---";

    switch (value) {
        case 'paid':
            return 'پرداخت شده';
        case 'debtor':
            return 'بدهکار';
        default:
            return '---';
    }
}
const course = computed(() => store.course);
const loading = computed(() => store.loading);
const settings = computed(() => store1.getSettings);

const purchase = computed(() => store.purchase);
const exam_result = computed(() => store.exam_result);

const id = computed(() => params['id']);

const paytypes = [
    { name: 'نقدی', value: 'cash' },
    { name: 'اقساطی', value: 'installments' },
]

const schema = ref(
    object({
        paid_cost: number().required().min(0)
    })
);

const cashPayment = (debtType = false) => {
    var minimum = 0;
    if (debtType) {
        minimum = purchase.value ? purchase.value.debt_balance : 0;
    } else {
        minimum = course.value && course.value.price ? course.value.price : 0;
    }

    if (form.value) {
        form.value.resetForm({
            values: {
                paid_cost: minimum
            }
        })
    }
};

const installmentsPayment = () => {
    const price = course.value && course.value.price ? course.value.price : 0;
    const result = price / 100 * (settings.value.minimum_percentage_course_purchase ?? 100);

    if (form.value) {
        form.value.resetForm({
            values: {
                paid_cost: result
            }
        })
    }
}

const open = async () => {
    show.value = true;
}

const close = async () => {
    show.value = false;
}

const pay = async () => {
    selectedPay.value = 'init';
    await open();
    cashPayment();

};
const debtPay = async () => {
    selectedPay.value = 'debt'
    await open();
    cashPayment(true);

};

const retest = async () => {
    try {
        const response = await store.allowed(course.value.id);
        toast.success(response.message);
        store.fetchCourseFromServer(id.value);
        store1.fetchProfileInfo();
    } catch (error) {
        displayError(error);
    }
}
const gotoExam = async () => {
    push(`/exam/${course.value.id}`);
};
watch(selected, (value) => {
    if (value === 'cash') {
        cashPayment();
    } else {
        installmentsPayment()
    }
})

onMounted(async () => {
    if (!id.value) {
        toast.error('دوره یافت نشد');
        await push({ name: 'Courses' });
        return;
    }

    store.fetchCourseFromServer(id.value);
});



const marker = (index) => {
    if (index > 8) return index + 1;

    return ` ${index + 1} 0 :`
}

const gateway = async (values) => {
    if (!values || isEmpty(values)) return;
    try {
        isRedirect.value = true;
        const fd = new FormData();

        fd.append('course_id', course.value.id);
        fd.append('paid_cost', values.paid_cost);
        if (selectedPay.value != 'debt') {
            var response = await store.orderCourse(fd);
        } else {
            var response = await store.paymentInstallments(fd);
        }

        if (response.success) {
            toast.success(response.message);
            store.fetchCourseFromServer(id.value);
            store1.fetchProfileInfo();
            await close();
        }
        // if (response?.gateway_url) window.location.href = response.gateway_url;

    } catch (error) {

    } finally {
        isRedirect.value = false;
    }
}

</script>

<style scoped></style>