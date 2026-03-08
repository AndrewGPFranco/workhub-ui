<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {i18n} from '../i18n';
import {useAuthStore} from '../stores/authStore';

const {t} = i18n;
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const code = ref('');
const email = ref('');

onMounted(() => {
  email.value = route.query.email as string || '';
  if (!email.value) {
    authStore.error = 'E-mail não encontrado. Por favor, tente registrar novamente.';
  }
});

async function handleValidate() {
  if (code.value.length !== 6) {
    authStore.error = t('validate.codeLengthError');
    return;
  }

  try {
    await authStore.validate(email.value, code.value);
    setTimeout(() => {
      router.push({name: 'AuthRegister'});
    }, 2000);
  } catch (err: any) {
    // Error is handled by the store
  }
}
</script>

<template>
  <div class="premium-card">
    <h1>{{ t('validate.title') }}</h1>
    <p class="subtitle">{{ t('validate.subtitle') }} <strong>{{ email }}</strong>.</p>

    <div v-if="authStore.success" class="success-banner">
      {{ authStore.success }}
    </div>

    <form v-else @submit.prevent="handleValidate">
      <div class="form-group">
        <label for="validateCode">{{ t('validate.codeLabel') }}</label>
        <input
            id="validateCode"
            v-model="code"
            type="text"
            maxlength="6"
            placeholder="000000"
            required
            style="text-align: center; font-size: 24px; letter-spacing: 8px;"
        />
      </div>

      <div v-if="authStore.error" class="error-msg" style="margin-bottom: 16px;">
        {{ authStore.error }}
      </div>

      <button type="submit" class="btn-primary" :disabled="authStore.loading || !email">
        {{ authStore.loading ? t('validate.loading') : t('validate.button') }}
      </button>

      <p class="subtitle" style="margin-top: 24px; text-align: center;">
        {{ t('validate.resend') }}
      </p>
    </form>
  </div>
</template>
