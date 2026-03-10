import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(false);
    const error = ref('');
    const success = ref('');
    const token = ref(localStorage.getItem('token') || '');
    const tempEmail = ref('');

    async function handleResponse(response: Response) {
        const contentType = response.headers.get('content-type');
        let data: any = {};

        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch (e) {
                throw new Error('Invalid JSON response from server');
            }
        } else {
            const text = await response.text();
            data = {response: text || 'Empty response from server'};
        }

        if (!response.ok) {
            throw new Error(data.response || `Server error: ${response.status}`);
        }

        return data;
    }

    async function register(form: any) {
        loading.value = true;
        error.value = '';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });

            return await handleResponse(response);
        } catch (err: any) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function validate(email: string, code: string) {
        loading.value = true;
        error.value = '';
        success.value = '';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register/code`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, code})
            });

            const data = await handleResponse(response);
            success.value = data.response || 'Success';
            return data;
        } catch (err: any) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function login(form: any) {
        loading.value = true;
        error.value = '';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });

            const data = await handleResponse(response);
            token.value = data.response;
            localStorage.setItem('token', token.value);
            return data;
        } catch (err: any) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function logout() {
        token.value = '';
        localStorage.removeItem('token');
    }

    function isAuthenticated() {
        const currentToken = token.value;
        if (!currentToken) return false;

        try {
            const parts = currentToken.split('.');
            if (parts.length !== 3 || !parts[1]) return false;

            const payload = JSON.parse(atob(parts[1]));
            if (!payload?.exp) return false;

            const exp = payload.exp * 1000;
            return Date.now() < exp;
        } catch (e) {
            return false;
        }
    }

    return {
        loading,
        error,
        success,
        token,
        tempEmail,
        register,
        validate,
        login,
        logout,
        isAuthenticated
    };
});
