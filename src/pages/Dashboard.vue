<script setup lang="ts">
import { ref } from 'vue'
import RecipeCard from '@/components/dishes/RecipeCard.vue'
import FloatingAddButton from '@/components/ui/FloatingAddButton.vue'
import AddDishToast from '@/components/dishes/AddDishToast.vue'
import { useDishes } from '@/composables/useDishes'

const showAdd = ref(false)

const { dishes, loading, error, reload, getImageUrl } = useDishes()
</script>

<template>
  <div class="dashboard">
    <h1>Recipes</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div class="grid">
      <RecipeCard
        v-for="dish in dishes"
        :key="dish.id"
        :id="dish.id"
        :title="dish.name"
        :description="dish.description"
        :calories="dish.calories"
        :image-url="getImageUrl(dish)"
      />
    </div>

    <FloatingAddButton @click="showAdd = true" />

    <AddDishToast
      v-if="showAdd"
      @close="showAdd = false"
      @created="reload"
    />
  </div>
</template>

<style scoped>

.dashboard {
  min-width: 50%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}


</style>