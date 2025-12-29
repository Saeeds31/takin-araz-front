import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import Panel from "@/views/Panel.vue";
import Register from "@/views/Register.vue";
import carDetail from "@/views/carDetail.vue";
import home from "@/views/home.vue";
import Contactus from "@/views/Contactus.vue";
import Aboutus from "@/views/Aboutus.vue";
import Index from "@/views/Index.vue";
import checkMobile from "@/views/CheckMobile.vue";
import VerifyCode from "@/views/VerifyCode.vue";
import salePlan from "@/views/salePlan.vue";
const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "",
        name: "home",
        component: home,
      },

      {
        path: "/cars/:id",
        name: "car-detail",
        component: carDetail,
      },
      {
        path: "/sales-plan/:id",
        name: "sales-plan-detail",
        component: salePlan,
      },
      {
        path: "/contact-us",
        name: "Contactus",
        component: Contactus,
      },
      {
        path: "/check-mobile",
        name: "check-mobile",
        component: checkMobile,
      },
      {
        path: "/verify-code",
        name: "Verify",
        component: VerifyCode,
      },

      {
        path: "/about-us",
        name: "Aboutus",
        component: Aboutus,
      },
    ],
  },

  {
    path: "/user-panel",
    name: "Panel",
    component: Panel,
    redirect: "/panel/identity-info",
    children: [
      {
        path: "identity-info",
        name: "Identity-Info",
        component: () => import("@/components/register/IdentityInfo.vue"),
      },
      {
        path: "identity-docs",
        name: "Identity-Docs",
        component: () => import("@/components/register/IdentityDocs.vue"),
      },
      {
        path: "physical-info",
        name: "Physical-Info",
        component: () => import("@/components/register/PhysicalInfo.vue"),
      },
      {
        path: "education-docs",
        name: "Education-Docs",
        component: () => import("@/components/register/EducationDocs.vue"),
      },
      {
        path: "courses",
        name: "Courses",
        component: () => import("@/views/Courses.vue"),
      },
      {
        path: "course/:id",
        name: "Courses-Detail",
        component: () => import("@/views/CourseDetail.vue"),
      },

      {
        path: "exam-detail/:id",
        name: "Exam-Detail",
        component: () => import("@/views/Exam.vue"),
      },
      {
        path: "wallet",
        name: "Wallet",
        component: () => import("@/views/Wallet.vue"),
      },
      {
        path: "status",
        name: "Status",
        component: () => import("@/views/PersonStatus.vue"),
      },
      {
        path: "purchased",
        name: "Purchased",
        component: () => import("@/views/PurchasedCourses.vue"),
      },
      {
        path: "membership",
        name: "Membership",
        component: () => import("@/views/MembershipCard.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/Contact.vue"),
      },
      {
        path: "receipts",
        name: "Receipts",
        component: () => import("@/views/Receipts.vue"),
      },
      {
        path: "referral",
        name: "Referral",
        component: () => import("@/components/panel/Referral.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
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
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    return { top: 0 };
  },
});

export default router;
