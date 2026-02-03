<script setup lang="ts">
defineProps<{
  title: string
  description: string
  calories: number
  imageUrl?: string | null
}>()
</script>

<template>
  <div class="card">
    <div class="image-wrap">
      <img v-if="imageUrl" :src="imageUrl" />
      <div v-else class="placeholder">🍽</div>

      <span class="badge">{{ calories }} kcal</span>
    </div>

    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.image-wrap {
  position: relative;
  height: 160px;
  background: #f3f4f6;
}

.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #9ca3af;
}

.badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.content {
  padding: 14px;
}

h3 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
}

p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}
</style>
