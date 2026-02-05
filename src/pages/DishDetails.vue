<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { dishesApi, type DishIngredient, type Dish } from '@/api/dishes.api'
import { productsApi } from '@/api/products.api'
import { calcNutrition, roundNutrition } from '@/api/nutrition'
import type { Nutrition } from '@/types/nutrition'

const route = useRoute()
const router = useRouter()

const dishId = route.params.id as string

const dish = ref<Dish | null>(null)
const ingredients = ref<DishIngredient[]>([])
const products = ref<any[]>([])

const selectedProduct = ref('')
const weight = ref(100)

const loading = ref(false)
const error = ref('')

const imageUrl = computed(() => {
    if (!dish.value) return undefined
    return dishesApi.getImageUrl(dish.value) || undefined
})

const loadDish = async () => {
    dish.value = await dishesApi.getDish(dishId)
}

const loadIngredients = async () => {
    ingredients.value = await dishesApi.getIngredients(dishId)
}

const loadProducts = async () => {
    products.value = await productsApi.list()
}

const recalcNutrition = async () => {
    const raw = calcNutrition(ingredients.value)
    const nutrition = roundNutrition(raw)
    await dishesApi.updateNutrition(dishId, nutrition)

    if (dish.value) {
        dish.value.calories = nutrition.calories
        dish.value.protein = nutrition.protein
        dish.value.fat = nutrition.fat
        dish.value.carbs = nutrition.carbs
    }
}

const addIngredient = async () => {
    if (!selectedProduct.value || !weight.value) return

    await dishesApi.addIngredient(
        dishId,
        selectedProduct.value,
        weight.value
    )

    await loadIngredients()
    await recalcNutrition()

    selectedProduct.value = ''
    weight.value = 100
}

const removeIngredient = async (id: string) => {
    await dishesApi.removeIngredient(id)
    await loadIngredients()
    await recalcNutrition()
}

onMounted(async () => {
    loading.value = true
    error.value = ''

    try {
        await Promise.all([
            loadDish(),
            loadIngredients(),
            loadProducts()
        ])
    } catch (e) {
        error.value = 'Failed to load dish'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="details">
        <button class="back" @click="router.back()">← Back</button>

        <p v-if="loading">Loading...</p>
        <p v-else-if="error" class="error">{{ error }}</p>

        <div v-else-if="dish">
            <img v-if="imageUrl" :src="imageUrl" class="image" />

            <h1>{{ dish.name }}</h1>
            <p class="description">{{ dish.description }}</p>

            <div class="nutrition">
                <div><b>{{ dish.calories }}</b> kcal</div>
                <div><b>{{ dish.protein }}</b> protein</div>
                <div><b>{{ dish.fat }}</b> fat</div>
                <div><b>{{ dish.carbs }}</b> carbs</div>
            </div>

            <section class="ingredients">
                <h2>Ingredients</h2>

                <ul>
                    <li v-for="item in ingredients" :key="item.id">
                        <span>
                            {{ item.expand?.product.name }} —
                            {{ item.weight }} g
                        </span>

                        <button @click="removeIngredient(item.id)">✕</button>
                    </li>
                </ul>

                <div class="add">
                    <div class="field">
                        <select v-model="selectedProduct">
                            <option value="">Select product</option>
                            <option v-for="p in products" :key="p.id" :value="p.id">
                                {{ p.name }}
                            </option>
                        </select>
                    </div>

                    <div class="field small">
                        <input type="number" min="1" v-model.number="weight" />
                        <span class="unit">g</span>
                    </div>

                    <button class="add-btn" @click="addIngredient">
                        Add
                    </button>
                </div>

            </section>
        </div>
    </div>
</template>

<style scoped>
.details {
    max-width: 900px;
}

.back {
    margin-bottom: 16px;
    background: none;
    border: none;
    color: #6366f1;
    cursor: pointer;
}

.image {
    width: 100%;
    max-height: 360px;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 20px;
}

.description {
    color: #6b7280;
    margin-bottom: 20px;
}

.nutrition {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    background: white;
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 32px;
    font-size: 14px;
}

.ingredients h2 {
    margin-bottom: 12px;
}

.ingredients ul {
    list-style: none;
    padding: 0;
    margin-bottom: 16px;
}

.ingredients li {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
}

.ingredients button {
    background: none;
    border: none;
    cursor: pointer;
    color: #ef4444;
}

.add {
  display: flex;
  gap: 12px;
  align-items: center;
}

.field {
  position: relative;
  flex: 1;
}

.field.small {
  max-width: 100px;
}

select,
input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-family: inherit;
  font-size: 14px;
  background: white;
  color: #111827;
}

select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #6b7280 50%),
    linear-gradient(135deg, #6b7280 50%, transparent 50%);
  background-position:
    calc(100% - 16px) 16px,
    calc(100% - 12px) 16px;
  background-size: 4px 4px;
  background-repeat: no-repeat;
  cursor: pointer;
}

input[type='number'] {
  padding-right: 26px;
}

.unit {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #6b7280;
  pointer-events: none;
}

select:focus,
input:focus {
  outline: none;
  border-color: #6366f1;
}

.add-btn {
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.add-btn:hover {
  background: #5457e0;
}

.error {
    color: #ef4444;
}
</style>
