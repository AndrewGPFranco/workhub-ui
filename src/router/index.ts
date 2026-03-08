import {createRouter, createWebHistory} from 'vue-router';
import AuthRegisterView from '../views/AuthRegisterView.vue';
import AuthValidateView from '../views/AuthValidateView.vue';
import AuthLoginView from '../views/AuthLoginView.vue';
import HomeView from '../views/HomeView.vue';
import {useAuthStore} from '../stores/authStore';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth/login',
            name: 'AuthLogin',
            component: AuthLoginView
        },
        {
            path: '/auth/register',
            name: 'AuthRegister',
            component: AuthRegisterView
        },
        {
            path: '/auth/validate',
            name: 'AuthValidate',
            component: AuthValidateView
        },
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {requiresAuth: true}
        }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
        authStore.logout();
        next({name: 'AuthLogin'});
    } else {
        next();
    }
});

export default router;
