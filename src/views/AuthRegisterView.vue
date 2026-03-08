<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {i18n} from '../i18n';

const {t} = i18n;
const router = useRouter();
const loading = ref(false);
const error = ref('');

const form = ref({
  firstName: '',
  fullname: '',
  username: '',
  email: '',
  password: '',
  dateBirth: ''
});

async function handleRegister() {
  loading.value = true;
  error.value = '';

  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form.value)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || t('register.error'));
    }

    router.push({
      name: 'AuthValidate',
      query: {email: form.value.email}
    });
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
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
          <label>{{ t('register.firstName') }}</label>
          <input v-model="form.firstName" type="text" placeholder="Ex: Andrew" required/>
        </div>
        <div>
          <label>{{ t('register.fullName') }}</label>
          <input v-model="form.fullname" type="text" placeholder="Ex: Andrew GP" required/>
        </div>
      </div>

      <div class="form-group">
        <label>{{ t('register.username') }}</label>
        <input v-model="form.username" type="text" placeholder="@seu_usuario" required/>
      </div>

      <div class="form-group">
        <label>{{ t('register.email') }}</label>
        <input v-model="form.email" type="email" placeholder="seu@email.com" required/>
      </div>

      <div class="form-group">
        <label>{{ t('register.password') }}</label>
        <input v-model="form.password" type="password" placeholder="••••••••" required/>
      </div>

      <div class="form-group">
        <label>{{ t('register.dateBirth') }}</label>
        <input v-model="form.dateBirth" type="date" required/>
      </div>

      <div v-if="error" class="error-msg" style="margin-bottom: 16px;">
        {{ error }}
      </div>

      <button type="submit" class="btn-primary" :disabled="loading">
        {{ loading ? t('register.loading') : t('register.button') }}
      </button>
    </form>
  </div>
</template>