<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <header class="topbar">
    <input class="search" placeholder="Search recipes..." />

    <div class="user">
      <span>{{ user?.email }}</span>
      <img
        src="https://cdn-icons-png.flaticon.com/512/33/33771.png"
        alt="avatar"
      />
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 64px;
  background: white;
  border-bottom: 1px solid #eee;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search {
  width: 300px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.user img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
</style>