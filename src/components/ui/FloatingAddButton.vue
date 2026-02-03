<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="fab" @click="$emit('click')">
    +
  </button>
</template>

<style scoped>
.fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #6366f1;
  color: white;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.fab:hover {
  background: #5457e0;
}
</style>
