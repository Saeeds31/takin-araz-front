<template>
    <div v-if="!user" class="h-full flex flex-col items-center justify-center gap-8">
        <Branding class="mb-3" />

        <h2 class="text-center text-2xl font-family-bold ">مشاهده اطلاعات </h2>
        <p class="mb-4">برای مشاهده اطلاعات مد نظرتان لطفا فرم زیر را کامل کنید</p>

        <Form class="w-full lg:w-1/2" @submit="submit" :validation-schema="schema" v-slot="{ meta }">
            <FormInput type="text" label="نام و  نام خانوادگی" dir="ltr" name="full_name"
                hint="نام کامل خود را وارد کنید(اجباری نیست)" />
            <FormInput type="tel" label="شماره تلفن" dir="ltr" name="mobile" hint="شماره موبایل خود را وارد کنید" />
            <BaseButton class="w-full mb-6" id="validateBtn" v-if="type == 'checkMobile'" type="submit"
                :disabled="loading">
                ارسال کد</BaseButton>
            <BaseButton class="w-full mb-6" v-else @click="sendToken()" type="button" :disabled="loading">
                ارسال کد</BaseButton>
            <FormInput type="tel" label="کد یکبار مصرف" dir="ltr" name="token" hint="کدیکبار مصرف پیامک شده" />
            <BaseButton class="w-full" :type="type != 'checkMobile' ? 'submit' : 'button'"
                :disabled="!meta.valid || loading1">
                تایید اطلاعات</BaseButton>

        </Form>
    </div>
    <div v-else>
        <Branding class="mb-3" />

        <h2 class="text-center text-2xl font-family-bold ">
            اطلاعات - {{ user?.full_name }}
        </h2>

        <div class="card border-0 shadow-lg rounded-4">
            <div class="card-header text-center pt-5 bg-gradient text-white"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 24px 24px 0 0 !important;">
                <!-- تصویر پروفایل -->
                <img src="@/assets/images/placeholder-image.png" alt="پروفایل"
                    class="w-[95%] m-auto rounded-2xl border border-5 border-white shadow-lg">
                <h4 class="mt-3 mb-0">{{ user?.full_name || 'نام کاربر' }}</h4>
                <small>عضو تکین آرتا پرگاس</small>
            </div>

            <div class="card-body p-5">
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center bg-light rounded-3 p-3 shadow-sm">
                            <div class="icon-circle bg-success text-white me-3">
                                <i class="bi bi-person-vcard-fill fs-4"></i>
                            </div>
                            <div>
                                <small class="text-muted">کد ملی</small>
                                <p class="mb-0 fw-bold fs-5 font-monospace" dir="ltr">{{ user?.national_code || '---' }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex align-items-center bg-light rounded-3 p-3 shadow-sm">
                            <div class="icon-circle bg-danger text-white me-3">
                                <i class="bi bi-geo-alt-fill fs-4"></i>
                            </div>
                            <div>
                                <small class="text-muted">شهر</small>
                                <p class="mb-0 fw-bold fs-5" dir="ltr">{{ user?.city?.name || 'ثبت نشده' }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex align-items-center bg-light rounded-3 p-3 shadow-sm">
                            <div class="icon-circle bg-info text-white me-3">
                                <i class="bi bi-telephone-fill fs-4"></i>
                            </div>
                            <div>
                                <small class="text-muted">شماره تماس</small>
                                <p class="mb-0 fw-bold fs-5" dir="ltr">{{ user?.mobile || 'ثبت نشده' }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex align-items-center bg-light rounded-3 p-3 shadow-sm">
                            <div class="icon-circle bg-warning text-white me-3">
                                <i class="bi bi-cake2-fill fs-4"></i>
                            </div>
                            <div>
                                <small class="text-muted">تاریخ تولد</small>
                                <p class="mb-0 fw-bold fs-5" dir="ltr">{{ new
                                    Date(user?.birth_date).toLocaleDateString('fa') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex align-items-center bg-light rounded-3 p-3 shadow-sm">
                            <div class="icon-circle bg-primary text-white me-3">
                                <i class="bi bi-shield-check fs-4"></i>
                            </div>
                            <div>
                                <small class="text-muted">اعتبار در تکین آرتا پرگاس</small>
                                <p class="mb-0 fw-bold fs-4" dir="ltr"
                                    :class="user?.validity ? 'text-success' : 'text-danger'">
                                    {{ user?.validity ?
                                        new Date(user.validity.to_date).toLocaleDateString('fa') :
                                        'بدون اعتبار' }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
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
let type = ref('checkMobile')
let user = ref(null);
const { displayError } = useErrors();
const route = useRoute();
let loading = ref(false);
let loading1 = ref(false);
const schema = object({
    mobile: string().required().min(11),
    token: string().nullable().length(6),
    full_name: string().nullable().min(3)
});
function sendToken() {
    type.value = 'checkMobile';
    document.getElementById('validateBtn').click();
}
const submit = async (values) => {
    if (!values || !values.mobile) return;
    loading.value = true;
    loading1.value = true;
    try {
        const fd = new FormData();
        fd.append('mobile', values.mobile)
        fd.append('user_id', route.params.id);
        if (type.value != 'checkMobile') {
            fd.append('full_name', values.full_name)
            fd.append('token', values.token);
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${type.value == 'checkMobile' ? 'employers-mobile' : 'employers-validate'}`, fd);
        if (type.value == 'checkMobile') {
            type.value = '';
        }
        toast.success(response.data.message);
        if (response.data.success == true) {
            user.value = response.data.user.user;
        }
    } catch (error) {
        displayError(error);
    } finally {
        if (type.value != 'checkMobile') {
            loading.value = false;
            loading1.value = false;

        } else {
            setTimeout(() => {
                loading.value = false;
            }, 60000);
            loading1.value = false;
        }
    }
}
</script>