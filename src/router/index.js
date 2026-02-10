import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home.vue"),
      },

      {
        path: "/cars/:id",
        name: "car-detail",
        component: () => import("@/views/carDetail.vue"),
      },
      {
        path: "/sales-plan/:id",
        name: "sales-plan-detail",
        component: () => import("@/views/salePlan.vue"),
      },
      {
        path: "/check-mobile",
        name: "check-mobile",
        component: () => import("@/views/CheckMobile.vue"),
      },
      {
        path: "/verify-code",
        name: "Verify",
        component: () => import("@/views/VerifyCode.vue"),
      },

      {
        path: "/about-us",
        name: "Aboutus",
        component: () => import("@/views/Aboutus.vue"),
      },
    ],
  },

  {
    path: "/user-panel",
    name: "Panel",
    component: () => import("@/views/Panel.vue"),
    redirect: "/panel/identity-info",
    children: [],
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    redirect: "/register/step/1",
    children: [
      {
        path: "step/1",
        name: "Step1",
        component: () => import("@/components/register/IdentityInfo.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,

});

export default router;
