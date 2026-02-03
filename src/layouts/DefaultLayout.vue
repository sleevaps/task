<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue';
</script>

<template>
  <div class="layout">
    <Sidebar />

    <div class="main">
      <Header />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}
</style>
