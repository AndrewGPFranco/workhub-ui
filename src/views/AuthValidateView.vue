<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {i18n} from '../i18n';

const {t} = i18n;
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const error = ref('');
const success = ref('');
const code = ref('');
const email = ref('');

onMounted(() => {
  email.value = route.query.email as string || '';
  if (!email.value) {
    error.value = 'E-mail não encontrado. Por favor, tente registrar novamente.';
  }
});

async function handleValidate() {
  if (code.value.length !== 6) {
    error.value = t('validate.codeLengthError');
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch('http://localhost:8080/auth/register/code', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.value,
        code: code.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || t('validate.error'));
    }

    success.value = t('validate.success');
    setTimeout(() => {
      router.push({name: 'AuthRegister'});
    }, 2000);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="premium-card">
    <h1>{{ t('validate.title') }}</h1>
    <p class="subtitle">{{ t('validate.subtitle') }} <strong>{{ email }}</strong>.</p>

    <div v-if="success" class="success-banner">
      {{ success }}
    </div>

    <form v-else @submit.prevent="handleValidate">
      <div class="form-group">
        <label>{{ t('validate.codeLabel') }}</label>
        <input
            v-model="code"
            type="text"
            maxlength="6"
            placeholder="000000"
            required
            style="text-align: center; font-size: 24px; letter-spacing: 8px;"
        />
      </div>

      <div v-if="error" class="error-msg" style="margin-bottom: 16px;">
        {{ error }}
      </div>

      <button type="submit" class="btn-primary" :disabled="loading || !email">
        {{ loading ? t('validate.loading') : t('validate.button') }}
      </button>

      <p class="subtitle" style="margin-top: 24px; text-align: center;">
        {{ t('validate.resend') }}
      </p>
    </form>
  </div>
</template>
