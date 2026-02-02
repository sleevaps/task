<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { dishesApi } from '@/api/dishes.api'
import { calcNutrition, roundNutrition } from '@/api/nutrition'

const props = defineProps<{
  dishId: string
}>()

const emit = defineEmits<{
  (e: 'nutrition', data: any): void
}>()

const { products, loadProducts } = useProducts()

const productId = ref('')
const weight = ref(100)
const ingredients = ref<any[]>([])

loadProducts()

const loadIngredients = async () => {
  ingredients.value = await dishesApi.getIngredients(props.dishId)

  const nutrition = roundNutrition(calcNutrition(ingredients.value))

  emit('nutrition', nutrition)

  await dishesApi.updateNutrition(props.dishId, nutrition)
}

watch(() => props.dishId, loadIngredients, { immediate: true })

const add = async () => {
  if (!productId.value || weight.value <= 0) return

  await dishesApi.addIngredient(props.dishId, productId.value, weight.value)

  productId.value = ''
  weight.value = 100

  await loadIngredients()
}
</script>

<template>
  <div class="card">
    <h3>Ingredients</h3>

    <div class="row">
      <select v-model="productId">
        <option value="">Select product</option>
        <option v-for="p in products" :key="p.id" :value="p.id">
          {{ p.name }}
        </option>
      </select>

      <input v-model.number="weight" type="number" placeholder="g" />

      <button @click="add">+</button>
    </div>

    <ul>
      <li v-for="i in ingredients" :key="i.id">
        {{ i.expand.product.name }} — {{ i.weight }}g
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 90px 40px;
  gap: 8px;
}

select, input {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  border-radius: 8px;
  border: none;
  background: #6366f1;
  color: white;
  font-size: 20px;
}

ul {
  margin-top: 10px;
  padding-left: 12px;
}
</style>
