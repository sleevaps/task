<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <span>FlavorFit</span>
    </div>

    <nav class="nav">
      <RouterLink
        to="/"
        class="nav-item"
        :class="{ active: isActive('/') }"
      >
        Home
      </RouterLink>

      <button class="nav-item active">
        Recipes
      </button>

      <button class="nav-item">
        Nutrition
      </button>

      <button class="nav-item">
        Analytics
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 28px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  color: #444;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
}

.nav-item:hover {
  background: #f5f6fa;
}

.nav-item.active {
  background: #eef2ff;
  color: #4f46e5;
  font-weight: 600;
}

.emoji {
  font-size: 16px;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

.filters h4 {
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 8px;
  color: #444;
}
</style>
