<script setup lang="ts">
import { ref } from 'vue'
import { useProducts } from '@/composables/useProducts'

const { createProduct, loading } = useProducts()

const form = ref({
    name: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
})

const submit = async () => {
    if (!form.value.name.trim()) return

    await createProduct(form.value)

    form.value = {
    name: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
    }
}
</script>

<template>
    <div class="card">
        <h3>Add product</h3>

        <input v-model="form.name" placeholder="Name" />

        <div class="grid">
            <input v-model.number="form.calories" type="number" placeholder="Calories" />
            <input v-model.number="form.protein" type="number" placeholder="Protein" />
            <input v-model.number="form.fat" type="number" placeholder="Fat" />
            <input v-model.number="form.carbs" type="number" placeholder="Carbs" />
        </div>

        <button @click="submit" :disabled="loading">
            {{ loading ? 'Adding...' : 'Add' }}
        </button>
    </div>
</template>

<style scoped>
.card {
  background: #fefefe;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
}

h3 {
  margin-bottom: 16px;
  color: #333;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  margin: 16px 0px;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

button {
  background: #6366f1;
  color: white;
  padding: 10px;
  border-radius: 12px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>