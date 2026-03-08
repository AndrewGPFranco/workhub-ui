import {createRouter, createWebHistory} from 'vue-router'
import AuthRegisterView from "@/views/AuthRegisterView.vue";
import AuthValidateView from "@/views/AuthValidateView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/auth/register",
            component: AuthRegisterView,
            name: "AuthRegister",
        },
        {
            path: "/auth/validate",
            component: AuthValidateView,
            name: "AuthValidate",
        }
    ],
})

export default router
