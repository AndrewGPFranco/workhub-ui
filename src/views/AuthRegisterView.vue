<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {i18n} from '../i18n';
import {useAuthStore} from '../stores/authStore';

const {t} = i18n;
const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  firstName: '',
  fullname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateBirth: ''
});

async function handleRegister() {
  if (form.value.password !== form.value.confirmPassword) {
    authStore.error = t('register.passwordMismatch');
    return;
  }

  try {
    // Only send relevant fields to the server
    const {confirmPassword, ...registerData} = form.value;
    await authStore.register(registerData);
    router.push({
      name: 'AuthValidate',
      query: {email: form.value.email}
    });
  } catch (err: any) {
    // Error is handled by the store
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <!-- Brand Panel (Left Side) -->
    <div class="brand-panel">
      <div class="brand-visual"></div>
      <h2>WorkHub</h2>
      <p>{{ t('brand.description') }}</p>
    </div>

    <!-- Form Panel (Right Side) -->
    <div class="form-panel">
      <h1>{{ t('register.title') }}</h1>
      <p class="subtitle">{{ t('register.subtitle') }}</p>

      <form @submit.prevent="handleRegister">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div class="input-container">
            <label for="firstName">{{ t('register.firstName') }}</label>
            <input id="firstName" v-model="form.firstName" type="text" class="input-field" placeholder="Ex: Andrew"
                   required/>
          </div>
          <div class="input-container">
            <label for="fullname">{{ t('register.fullName') }}</label>
            <input id="fullname" v-model="form.fullname" type="text" class="input-field" placeholder="Ex: Andrew GP"
                   required/>
          </div>
        </div>

        <div class="input-container">
          <label for="username">{{ t('register.username') }}</label>
          <input id="username" v-model="form.username" type="text" class="input-field" placeholder="@seu_usuario"
                 required/>
        </div>

        <div class="input-container">
          <label for="email">{{ t('register.email') }}</label>
          <input id="email" v-model="form.email" type="email" class="input-field" placeholder="seu@email.com" required/>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div class="input-container">
            <label for="password">{{ t('register.password') }}</label>
            <input id="password" v-model="form.password" type="password" class="input-field" placeholder="••••••••"
                   required/>
          </div>
          <div class="input-container">
            <label for="confirmPassword">{{ t('register.confirmPassword') || 'Confirm Password' }}</label>
            <input id="confirmPassword" v-model="form.confirmPassword" type="password" class="input-field"
                   placeholder="••••••••" required/>
          </div>
        </div>

        <div class="input-container">
          <label for="dateBirth">{{ t('register.dateBirth') }}</label>
          <input id="dateBirth" v-model="form.dateBirth" type="date" class="input-field" required/>
        </div>

        <div v-if="authStore.error" class="error-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {{ authStore.error }}
        </div>

        <button type="submit" class="btn-premium" :disabled="authStore.loading">
          <span v-if="!authStore.loading">{{ t('register.button') }}</span>
          <span v-else>{{ t('register.loading') }}</span>
          <svg v-if="!authStore.loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <p class="subtitle" style="margin-top: 32px; text-align: center;">
          {{ t('register.alreadyHaveAccount') }}
          <RouterLink :to="{ name: 'AuthLogin' }"
                      style="color: var(--primary); text-decoration: none; font-weight: 600;">
            {{ t('register.loginLink') }}
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>