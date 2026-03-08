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
  dateBirth: ''
});

async function handleRegister() {
  try {
    await authStore.register(form.value);
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
  <div class="premium-card">
    <h1>{{ t('register.title') }}</h1>
    <p class="subtitle">{{ t('register.subtitle') }}</p>

    <form @submit.prevent="handleRegister">
      <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <label for="firstName">{{ t('register.firstName') }}</label>
          <input id="firstName" v-model="form.firstName" type="text" placeholder="Ex: Andrew" required/>
        </div>
        <div>
          <label for="fullname">{{ t('register.fullName') }}</label>
          <input id="fullname" v-model="form.fullname" type="text" placeholder="Ex: Andrew GP" required/>
        </div>
      </div>

      <div class="form-group">
        <label for="username">{{ t('register.username') }}</label>
        <input id="username" v-model="form.username" type="text" placeholder="@seu_usuario" required/>
      </div>

      <div class="form-group">
        <label for="email">{{ t('register.email') }}</label>
        <input id="email" v-model="form.email" type="email" placeholder="seu@email.com" required/>
      </div>

      <div class="form-group">
        <label for="password">{{ t('register.password') }}</label>
        <input id="password" v-model="form.password" type="password" placeholder="••••••••" required/>
      </div>

      <div class="form-group">
        <label for="dateBirth">{{ t('register.dateBirth') }}</label>
        <input id="dateBirth" v-model="form.dateBirth" type="date" required/>
      </div>

      <div v-if="authStore.error" class="error-msg" style="margin-bottom: 16px;">
        {{ authStore.error }}
      </div>

      <button type="submit" class="btn-primary" :disabled="authStore.loading">
        {{ authStore.loading ? t('register.loading') : t('register.button') }}
      </button>
    </form>
  </div>
</template>