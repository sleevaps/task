<script setup lang="ts">
import { ref } from 'vue'
import { dishesApi } from '@/api/dishes.api'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
}>()

const name = ref('')
const description = ref('')
const image = ref<File | null>(null)
const loading = ref(false)
const error = ref('')

const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) image.value = files[0]
}

const submit = async () => {
  if (!name.value.trim()) return

  loading.value = true
  error.value = ''

  try {
    await dishesApi.createDish({
      name: name.value,
      description: description.value,
      image: image.value || undefined
    })

    emit('created')
    emit('close')
  } catch {
    error.value = 'Failed to create dish'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="toast">
      <h3>Add new dish</h3>

      <input v-model="name" placeholder="Dish name" />
      <textarea v-model="description" placeholder="Description" />

      <input type="file" accept="image/*" @change="onFileChange" />

      <button @click="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create dish' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
}

.toast {
  width: 360px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
}

input,
textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 600;
}

.error {
  margin-top: 8px;
  font-size: 13px;
  color: #ef4444;
}
</style>
