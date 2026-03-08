<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {i18n} from '../i18n';
import {useAuthStore} from '../stores/authStore';

const {t} = i18n;
const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  usernameOrEmail: '',
  password: ''
});

async function handleLogin() {
  try {
    await authStore.login({
      usernameOrEmail: form.value.usernameOrEmail,
      password: form.value.password
    });
    router.push({name: 'Home'}); // Assuming there is a Home route
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
      <p>{{ t('brand.welcomeBack') }}</p>
    </div>

    <!-- Form Panel (Right Side) -->
    <div class="form-panel">
      <h1>{{ t('login.title') }}</h1>
      <p class="subtitle">{{ t('login.subtitle') }}</p>

      <form @submit.prevent="handleLogin">
        <div class="input-container">
          <label for="usernameOrEmail">{{ t('login.usernameOrEmail') }}</label>
          <input id="usernameOrEmail" v-model="form.usernameOrEmail" type="text" class="input-field"
                 placeholder="Username or email" required/>
        </div>

        <div class="input-container">
          <label for="password">{{ t('login.password') }}</label>
          <input id="password" v-model="form.password" type="password" class="input-field" placeholder="••••••••"
                 required/>
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
          <span v-if="!authStore.loading">{{ t('login.button') }}</span>
          <span v-else>{{ t('login.loading') }}</span>
          <svg v-if="!authStore.loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <p class="subtitle" style="margin-top: 32px; text-align: center;">
          {{ t('login.noAccount') }}
          <RouterLink :to="{ name: 'AuthRegister' }"
                      style="color: var(--primary); text-decoration: none; font-weight: 600;">
            {{ t('login.registerLink') }}
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
