<script setup lang="ts">
import {i18n} from './i18n';

const toggleLang = (lang: 'pt' | 'en' | 'es') => {
  i18n.setLocale(lang);
};
</script>

<template>
  <div class="lang-switcher">
    <button
        v-for="lang in ['pt', 'en', 'es']"
        :key="lang"
        :class="{ active: i18n.locale.value === lang }"
        @click="toggleLang(lang as any)"
    >
      {{ lang.toUpperCase() }}
    </button>
  </div>
  <RouterView></RouterView>
</template>

<style>
.lang-switcher {
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
  background: rgba(17, 24, 39, 0.5);
  backdrop-filter: blur(12px);
  padding: 6px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
}

.lang-switcher button {
  background: transparent;
  border: none;
  color: #9ca3af;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-switcher button.active {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

.lang-switcher button:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}
</style>