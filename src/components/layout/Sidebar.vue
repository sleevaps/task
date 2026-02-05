<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const goHome = () => {
  router.push('/')
}

const onLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar">
    <div class="top">
      <div class="logo">FlavorFit</div>
    </div>

    <nav class="menu">
      <button class="item" @click="goHome">
        Home
      </button>
    </nav>

    <div class="bottom">
      <button class="logout" @click="onLogout">
        ⎋ Logout
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  position: sticky;
  top: 0px;
  background: #fff;
  color: #111827;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.top {
  margin-bottom: 24px;
}

.logo {
  font-size: 18px;
  font-weight: 700;
}

.menu {
  flex: 1;
}

.item {
  width: 100%;
  background: none;
  border: none;
  color: #111827;
  padding: 10px 12px;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
}

.item:hover {
  background: #f3f4f6;;
}

.bottom {
  margin-top: auto;
}

.logout {
  width: 100%;
  background: none;
  border: none;
  color: #111827;
  padding: 10px 12px;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
}

.logout:hover {
  background: #f3f4f6;;
}
</style>
