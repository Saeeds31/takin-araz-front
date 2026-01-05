import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
// Libraries
import pinia from "./stores";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import * as axios from "@/common/api";
import Vue3Toasity, { toast } from "vue3-toastify";
import Vue3Sanitize from "vue-3-sanitize";
import VueLazyLoad from "vue-lazyload";
import "@/common/utils/locale.js";

// Css
import "@/assets/css/index.css";
import "vue3-toastify/dist/index.css";

// Filters
import { date, price, resource } from "@/common/filters";

const app = createApp(App);
const head = createHead();
// Properties
app.config.globalProperties.$axios = axios.instance;
app.config.globalProperties.$filters = { date, price, resource };

app.component("DatePicker", Vue3PersianDatetimePicker);

app.use(router).use(pinia).use(Vue3Toasity, { autoClose: 3000, position: toast.POSITION.TOP_LEFT }).use(Vue3Sanitize);
app.use(head);
app.use(VueLazyLoad);
app.mount("#app");
