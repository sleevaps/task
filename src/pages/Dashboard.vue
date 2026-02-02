<script setup lang="ts">
import AddProductForm from '@/components/products/AddProductForm.vue';
import ProductsTable from '@/components/products/ProductsTable.vue';
import { ref } from 'vue'
import CreateDish from '@/components/dishes/CreateDish.vue'
import DishIngredients from '@/components/dishes/DishIngredients.vue'
import DishNutrition from '@/components/dishes/DishNutrition.vue'

const dishId = ref<string | null>(null)
const nutrition = ref({
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0
})
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <div class="grid">
      <AddProductForm />
      <ProductsTable />
    </div>

    <CreateDish @created="dishId = $event" />

    <div v-if="dishId" class="grid">
      <DishIngredients
        :dishId="dishId"
        @nutrition="nutrition = $event"
      />

      <DishNutrition :data="nutrition" />
    </div>

  </div>
</template>

<style scoped>
.dashboard {
  padding: 24px;
  background: #6366f1;
  min-height: 100vh;
}

.grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 20px;
  margin: 20px 0px;
}
</style>
