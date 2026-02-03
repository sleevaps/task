<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Страница не найдена</p>

    <button @click="goHome">
      Вернуться на главную
    </button>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}

h1 {
  font-size: 96px;
  margin: 0;
}

p {
  margin: 12px 0 24px;
  color: #666;
}

button {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
</style>
