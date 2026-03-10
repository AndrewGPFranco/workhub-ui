<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {i18n} from '../i18n';
import {useAuthStore} from '../stores/authStore';

const {t} = i18n;
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref('');
const digits = ref(['', '', '', '', '', '']);
const inputs = ref<HTMLInputElement[]>([]);

onMounted(() => {
  email.value = authStore.tempEmail || route.query.email as string || '';
  if (!email.value) {
  }
  nextTick(() => {
    inputs.value[0]?.focus();
  });
});

function handleInput(index: number, e: Event) {
  const input = e.target as HTMLInputElement;
  const val = input.value;

  // Only allow numbers
  if (!/^\d*$/.test(val)) {
    digits.value[index] = '';
    return;
  }

  // Handle paste
  if (val.length > 1) {
    const pasted = val.split('').slice(0, 6);
    pasted.forEach((char, i) => {
      if (index + i < 6) digits.value[index + i] = char;
    });
    const nextIdx = Math.min(index + pasted.length, 5);
    inputs.value[nextIdx]?.focus();
    return;
  }

  if (val && index < 5) {
    inputs.value[index + 1]?.focus();
  }
}

function handleKeyDown(index: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus();
  }
}

async function handleValidate() {
  const code = digits.value.join('');
  if (code.length !== 6) {
    authStore.error = t('validate.codeLengthError');
    return;
  }

  try {
    await authStore.validate(email.value, code);
    setTimeout(() => {
      router.push({name: 'Home'});
    }, 2000);
  } catch (err: any) {
    // Error is handled by store
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <!-- Brand Panel -->
    <div class="brand-panel">
      <div class="brand-visual"></div>
      <h2>WorkHub</h2>
      <p>{{ t('brand.validateDescription') }}</p>
    </div>

    <!-- Form Panel -->
    <div class="form-panel" style="display: flex; flex-direction: column; justify-content: center;">
      <h1>{{ t('validate.title') }}</h1>
      <p v-if="email" class="subtitle">{{ t('validate.subtitle') }} <strong>{{ email }}</strong>.</p>
      
      <div v-else class="input-container" style="margin-bottom: 24px;">
        <label for="email-fallback">{{ t('register.email') }}</label>
        <input id="email-fallback" v-model="email" type="email" class="input-field" :placeholder="t('register.email')" required/>
      </div>

      <div v-if="authStore.success" class="success-banner" style="margin-top: 0; margin-bottom: 32px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        {{ authStore.success }}
      </div>

      <form v-else @submit.prevent="handleValidate">
        <label for="otp-0"
               style="display: block; text-align: center; margin-bottom: 24px; font-weight: 600; color: var(--text-muted);">
          {{ t('validate.codeLabel') }}
        </label>

        <div class="otp-container">
          <input
              v-for="(digit, idx) in digits"
              :id="'otp-' + idx"
              :key="idx"
              ref="inputs"
              v-model="digits[idx]"
              type="text"
              maxlength="1"
              class="otp-digit"
              @input="handleInput(idx, $event)"
              @keydown="handleKeyDown(idx, $event)"
          />
        </div>

        <div v-if="authStore.error" class="error-box" style="margin-bottom: 32px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {{ authStore.error }}
        </div>

        <button type="submit" class="btn-premium" :disabled="authStore.loading || !email">
          <span v-if="!authStore.loading">{{ t('validate.button') }}</span>
          <span v-else>{{ t('validate.loading') }}</span>
          <svg v-if="!authStore.loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </button>

        <p class="subtitle" style="margin-top: 32px; text-align: center;">
          {{ t('validate.resend') }}
        </p>
      </form>
    </div>
  </div>
</template>
