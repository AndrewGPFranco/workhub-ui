import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(false);
    const error = ref('');
    const success = ref('');

    async function register(form: any) {
        loading.value = true;
        error.value = '';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error during registration');
            }

            return data;
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error validating code');
            }

            success.value = data.message || 'Success';
            return data;
        } catch (err: any) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        error,
        success,
        register,
        validate
    };
});
