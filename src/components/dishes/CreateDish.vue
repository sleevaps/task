<script setup lang="ts">
import { ref } from 'vue'
import { dishesApi } from '@/api/dishes.api'

const emit = defineEmits<{
  (e: 'created', id: string): void
}>()

const name = ref('')
const loading = ref(false)

const create = async () => {
  if (!name.value.trim()) return

  loading.value = true

  const dish = await dishesApi.createDish(name.value)

  emit('created', dish.id)

  name.value = ''
  loading.value = false
}
</script>

<template>
  <div class="card">
    <h3>Create dish</h3>

    <input v-model="name" placeholder="Dish name" />

    <button @click="create" :disabled="loading">
      {{ loading ? 'Creating...' : 'Create' }}
    </button>
  </div>
</template>

<style scoped>
.card {
  background: #fefefe;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 16px;
  color: #333;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 95%;
  margin-bottom: 12px;
}

button {
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: #22c55e;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
