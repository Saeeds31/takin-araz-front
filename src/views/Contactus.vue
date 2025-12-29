<template>
  <div>
    <p class="text-sm text-gray-400 mb-4">تماس باما</p>
    <p class="text-lg mb-4">تکین آرتا پرگاس</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 items-start mb-4">
    <div class="w-9/12 hidden lg:block">
      <img src="/src/assets/images/contact.png" alt="" />
    </div>

    <div class="border border-gray-300 rounded-2xl px-4 py-5">
      <div class="flex items-center gap-2 mb-4">
        <span class="inline-block size-3 bg-secondary rounded-full"></span>
        <p class="text-lg">فرم ارتباط با ما</p>
      </div>
      
      <Form @submit="submit" :validation-schema="schema" v-slot="{ meta, errors }">
        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
          <div class="flex flex-col gap-1 grow">
            <label for="first_name">نام</label>
            <Field name="first_name" type="text" class="border border-gray-300 rounded-md px-4 py-2 focus:outline-secondary" id="first_name"/>
            <ErrorMessage name="first_name" class="text-xs text-red-600" />
          </div>

          <div class="flex flex-col gap-1 grow">
            <label for="last_name">نام خانوادگی</label>
            <Field name="last_name" type="text" class="border border-gray-300 rounded-md px-4 py-2 focus:outline-secondary" id="last_name"/>
            <ErrorMessage name="last_name" class="text-xs text-red-600" />
          </div>
        </div>
  
        <div class="flex flex-col gap-1 grow mb-4">
          <label for="mobile">شماره تماس</label>
          <div class="flex items-center px-3 gap-2 border border-gray-300 rounded-md focus-within:border-secondary focus-within:border-2">
            <Field name="mobile" dir="ltr" type="tel" class="py-2 w-full outline-0" id="mobile"/>
            <span dir="ltr" class="text-nowrap font-family-regular">+98 |</span>
          </div>
          <ErrorMessage name="mobile" class="text-xs text-red-600" />
        </div>
  
        <Field as="textarea" name="description" class="w-full border border-gray-300 rounded-md p-4 focus:outline-secondary mb-2" placeholder="متن خود را بنویسید" rows="5"/>
        <ErrorMessage name="description" class="text-xs text-red-600" />
  
        <BaseButton class="ms-auto" type="submit" :disabled="!meta.valid">ارسال پیام</BaseButton>
      </Form>
    </div>
  </div>

  <p class="leading-8 font-family-regular">
    در جهان امروز، امنیت را نمی‌توان به امیدهای فردی سپرد. تیم بادیگاردینگ ما با بیش از ده سال تجربه در حفاظت از شخصیت‌های معتبر، رویدادها و سفرهای خاص، با رویکردی جامع و منطبق بر
    استانداردهای بین‌المللی، آماده پاسخگویی به هر تهدیدی است. از ارزیابی ریسک و طراحی پروفایل امنیتی شخصی تا اجرای دقیق در میدان عمل، ما کنار شما هستیم تا آرامش ذهن را به شما هدیه
    دهیم. امنیت مطمئن، نظارت بی‌وقفه، و رفتار حرفه‌ای این سه ستون خدمات ماست. با ما تماس بگیرید تا بر اساس نیازهای شما، طرح حفاظت منحصر‌به‌فردی ارائه دهیم و هر گام را با شفافیت و
    پاسخگویی کامل توضیح دهیم.
  </p>

  <div class="mt-20 flex flex-wrap gap-14">
    <div class="mb-6">
      <h6 class="mb-4">شماره تماس ها</h6>
      <div class="flex item-center gap-2 mb-3">
        <IconPhone />
        <span class="font-family-regular text-sm" dir="ltr">017 - 321 22 333</span>
      </div>
      <div class="flex item-center gap-2 mb-3">
        <IconMobile />
        <span class="font-family-regular text-sm" dir="ltr">0919 - 099 - 6808</span>
      </div>
      <div class="flex item-center gap-2">
        <IconMobile />
        <span class="font-family-regular text-sm" dir="ltr">0919 - 099 - 6808</span>
      </div>
    </div>

    <div class="mb-6">
      <h6 class="mb-4">شبکه های اجتماعی</h6>
      <div class="flex items-center gap-2 mb-3">
        <IconWApp />
        <span class="font-family-regular text-sm">واتساپ:</span>
        <span class="font-family-regular text-sm" dir="ltr">0919 - 099 - 6808</span>
      </div>
      <div class="flex items-center gap-2 mb-3">
        <IconTelegram />
        <span class="font-family-regular text-sm">تلگرام:</span>
        <span class="font-family-regular text-sm">Takin.Arta.p</span>
      </div>
      <div class="flex items-center gap-2">
        <IconInstagram />
        <span class="font-family-regular text-sm">اینستاگرام:</span>
        <span class="font-family-regular text-sm">Takin.Arta.p</span>
      </div>
    </div>

    <div class="mb-6">
      <h6 class="mb-4">آدرس</h6>
      <div class="flex items-center gap-2">
        <IconLocation />
        <span class="font-family-regular text-sm">مازندران ، همین نزدیکیا .....</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconInstagram from "@/common/icons/IconInstagram.vue";
import IconLocation from "@/common/icons/IconLocation.vue";
import IconMobile from "@/common/icons/IconMobile.vue";
import IconPhone from "@/common/icons/IconPhone.vue";
import IconTelegram from "@/common/icons/IconTelegram.vue";
import IconWApp from "@/common/icons/IconWApp.vue";
import BaseButton from "@/common/UI/BaseButton.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { ref } from "vue";
import { number, object, string } from "yup";

const schema = object({
  first_name: string().required(),
  last_name: string().required(),
  mobile: number().required(),
  description: string().required()
})

const submit = (values) => {
  console.log(values);
  
}
</script>

<style scoped></style>
