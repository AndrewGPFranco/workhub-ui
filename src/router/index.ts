import {createRouter, createWebHistory} from 'vue-router'
import AuthRegisterView from "@/views/AuthRegisterView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/auth/register",
            component: AuthRegisterView,
            name: "AuthRegister",
        }
    ],
})

export default router
