import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import { toast } from "vue3-toastify";

const UN_AUTHORIZED = 401;

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Handle headers
instance.defaults.headers.common["Accept"] = "application/json";

// Handle requests
instance.interceptors.request.use(
  (conf) => {
    const token = Cookies.get("token");

    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }

    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === UN_AUTHORIZED) {
      router.push({ name: "Check" });
      toast.error("توکن منقضی شده است");
    }
    if (
      error.response &&
      error.response.status >= 500 &&
      error.response.status < 600
    ) {
      toast.error("خطای سرور");
    }

    return Promise.reject(error);
  }
);

export { instance };
