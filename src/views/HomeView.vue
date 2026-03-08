<script setup lang="ts">
import {useRouter} from 'vue-router';
import {i18n} from '../i18n';
import {useAuthStore} from '../stores/authStore';

const {t} = i18n;
const router = useRouter();
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  router.push({name: 'AuthLogin'});
}
</script>

<template>
  <div class="home-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-dot"></div>
        <span>WorkHub</span>
      </div>

      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Dashboard
        </a>
        <a href="#" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Projects
        </a>
        <a href="#" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Team
        </a>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          {{ t('home.logout') }}
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="content-header">
        <h1>{{ t('home.welcome') }}</h1>
        <p class="subtitle">{{ t('home.subtitle') }}</p>
      </header>

      <div class="dashboard-grid">
        <div class="card glass">
          <h3>Recent Tasks</h3>
          <p class="empty-state">No new tasks to show.</p>
        </div>
        <div class="card glass">
          <h3>Team Updates</h3>
          <p class="empty-state">No updates from your team.</p>
        </div>
        <div class="card glass">
          <h3>Quick Note</h3>
          <textarea placeholder="Start typing..."></textarea>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  min-height: 100vh;
  color: var(--text);
}

.sidebar {
  width: 280px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 48px;
}

.brand-dot {
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--primary-glow);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-item:hover, .nav-item.active {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--glass-border);
  padding-top: 24px;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #f87171;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: rgba(248, 113, 113, 0.1);
}

.main-content {
  flex-grow: 1;
  padding: 48px 64px;
  overflow-y: auto;
}

.content-header h1 {
  font-size: 32px;
  margin-bottom: 8px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.card {
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
}

.card h3 {
  margin-bottom: 16px;
  font-size: 18px;
}

.empty-state {
  color: var(--text-muted);
  font-style: italic;
}

textarea {
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  padding: 12px;
  border-radius: 12px;
  color: var(--text);
  resize: none;
  font-family: inherit;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
