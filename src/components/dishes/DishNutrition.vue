<script setup lang="ts">
defineProps<{
  data: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
}>()
</script>

<template>
  <div class="card">
    <h3>Nutrition</h3>

    <div class="grid">
      <div>Calories <b>{{ data.calories }}</b></div>
      <div>Protein <b>{{ data.protein }}</b></div>
      <div>Fat <b>{{ data.fat }}</b></div>
      <div>Carbs <b>{{ data.carbs }}</b></div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  font-size: 18px;
}
</style>
