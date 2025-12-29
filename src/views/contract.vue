<template>
    <div class="flex flex-col items-center justify-center gap-8">
        <Branding class="mb-3" />

        <h2 class="text-center text-2xl font-family-bold ">درخواست ساماندهی جلسات </h2>
        <p class="mb-4">برای ثبت درخواست در سامانه تکین آرتا پرگاس ؛ لطفا فرم زیر را با دقت وارد نمایید</p>

        <Form class="w-full lg:w-1/2" @submit="submit" :validation-schema="schema" v-slot="{ meta }">
            <FormInput type="text" label="نام و  نام خانوادگی" dir="ltr" name="full_name"
                hint="نام کامل خود را وارد کنید" />
            <FormInput type="tel" label="کدملی" dir="ltr" name="national_code" hint="کدملی خود را وارد کنید" />
            <FormInput name="business_id" label="نوع کسب و کار" type="select" :options="businesses" />
            <FormInput type="text" label="نام کسب و کار" dir="ltr" name="business_label"
                hint="نام کسب و کار خود را وارد کنید" />
            <FormSelectCity name="city_id" />
            <FormInput type="tel" label="آدرس کسب و کار" dir="ltr" name="address"
                hint="آدرس کسب و کار خود را وارد کنید" />
            <FormInput name="from_date" label="از تاریخ" type="datepicker" />
            <FormInput name="to_date" label="تا تاریخ" type="datepicker" />
            <FormInput type="tel" label="تعداد نفرات" dir="ltr" name="number_people"
                hint="تعداد نفرات مورد نیاز خود را وارد کنید" />
            <FormInput type="textarea" label="توضیحات اضافی" dir="ltr" name="employer_description"
                hint="توضیحات اضافی در خصوص درخواست خود ...." />
            <h3 class="text-center text-xl font-family-bold ">درخواست کد یکبارمصرف </h3>
            <p class="mb-4">برای ثبت درخواست لطفا شماره تماس خود را وارد کنید و روی دکمه ارسال کد بزنید و کد ارسال شده
                را در کادر زیرآن وارد کنید</p>
            <FormInput type="tel" label="شماره تلفن" dir="ltr" name="mobile" hint="شماره موبایل خود را وارد کنید" />

            <BaseButton class="w-full mb-6" id="validateBtn" v-if="type == 'checkMobile'" type="submit"
                :disabled="loading">
                ارسال کد
            </BaseButton>
            <BaseButton class="w-full mb-6" v-else @click="sendToken()" type="button"
                :disabled="loading || counter != 0">
                <span v-if="counter != 0">{{ counter }}</span>
                <span>
                    ارسال مجدد کد
                </span>
            </BaseButton>
            <FormInput type="tel" label="کد یکبار مصرف" dir="ltr" name="token" hint="کدیکبار مصرف پیامک شده" />
            <BaseButton class="w-full" :type="type != 'checkMobile' ? 'submit' : 'button'"
                :disabled="!meta.valid || loading1">
                تایید اطلاعات</BaseButton>

        </Form>
    </div>

</template>

<script setup>
import Branding from '@/common/components/Branding.vue';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useErrors } from '@/composables/useError';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { object, string } from 'yup'
import FormInput from '@/common/components/FormInput.vue';
import BaseButton from '@/common/UI/BaseButton.vue';
import FormSelectCity from '@/common/components/FormSelectCity.vue';
import router from '@/router';
let businesses = ref([
    { label: 'مجرد', value: 0 },
    { label: 'متاهل', value: 1 },
]);
let type = ref('checkMobile')
const { displayError } = useErrors();
const route = useRoute();
let loading = ref(false);
let loading1 = ref(false);
const schema = object({
    mobile: string().required().min(11),
    business_id: string().required(),
    national_code: string().required(),
    full_name: string().required().min(3),
    token: string().nullable().length(6),
    from_date: string().required(),
    to_date: string().required(),
    address: string().required().min(10),
    number_people: string().required(),
    employer_description: string().nullable(),
    business_label: string().required(),
    city_id: object().required(),
});
function sendToken() {
    type.value = 'checkMobile';
    counter.value = 60;
    document.getElementById('validateBtn').click();

}
let timer = ref(null);
let counter = ref(60);
const submit = async (values) => {
    console.log(1);
    if (!values || !values.mobile) return;
    loading.value = true;
    loading1.value = true;
    try {
        const fd = new FormData();
        fd.append('mobile', values.mobile)
        if (type.value != 'checkMobile') {
            for (const key in values) {
                fd.append(key, values[key] != null ? (typeof values[key] == "object" ? values[key].id : values[key]) : "");
                if (key == 'city_id') {
                    fd.append('province_id', values[key].province_id)
                }
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${type.value == 'checkMobile' ? 'employer-otp' : 'contract'}`, fd);

        toast.success(response.data.message);
        if (type.value != 'checkMobile') {
            setTimeout(() => {
                router.push('/')
            }, 5000);
        }
        if (type.value == 'checkMobile') {
            type.value = '';
            timer.value = setInterval(() => {
                counter.value--;
                if (counter.value == 0) {
                    clearInterval(timer.value);
                }
            }, 1000)
        }
    } catch (error) {
        displayError(error);
    } finally {
        if (type.value != 'checkMobile') {
            loading.value = false;
            loading1.value = false; zp

        } else {
            setTimeout(() => {
                loading.value = false;
            }, 60000);
            loading1.value = false;
        }
    }
}
getBusinessFromServer();
function getBusinessFromServer() {
    axios.get(import.meta.env.VITE_BASE_URL + 'business').then(res => {
        businesses.value = res.data.data.map(item => {
            item.label = item.title;
            item.value = item.id;
            return item
        })
    })
}
</script>