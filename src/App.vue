<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {i18n} from './i18n';

const theme = ref(localStorage.getItem('theme') || 'dark');

const toggleLang = (lang: 'pt' | 'en' | 'es') => {
  i18n.setLocale(lang);
};

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem('theme', theme.value);
};

onMounted(() => {
  document.documentElement.dataset.theme = theme.value;
});
</script>

<template>
  <div class="bg-image"></div>
  <div class="bg-overlay"></div>
  <div class="bg-grid"></div>

  <div class="floating-actions">
    <div class="action-card">
      <button
          v-for="lang in ['pt', 'en', 'es']"
          :key="lang"
          :class="{ active: i18n.locale.value === lang }"
          @click="toggleLang(lang as any)"
      >
        {{ lang.toUpperCase() }}
      </button>
    </div>

    <div class="action-card">
      <button class="theme-toggle" @click="toggleTheme" title="Toggle Theme">
        <svg v-if="theme === 'dark'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      </button>
    </div>
  </div>

  <div class="auth-container">
    <RouterView></RouterView>
  </div>
</template>