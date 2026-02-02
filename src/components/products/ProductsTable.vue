<script setup lang="ts">
import { useProducts } from '@/composables/useProducts'

const { products, loading, loadProducts, deleteProduct } = useProducts()

loadProducts()
</script>

<template>
  <div class="card">
    <h3>Products</h3>

    <div v-if="loading">Loading...</div>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Carbs</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.calories }}</td>
          <td>{{ p.protein }}</td>
          <td>{{ p.fat }}</td>
          <td>{{ p.carbs }}</td>

          <td>
            <button class="del" @click="deleteProduct(p.id)">✕</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.card {
  background: #fefefe;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  margin-top: 0px;
}

h3 {
  margin-bottom: 16px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.del {
  border: none;
  background: #ef4444;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  padding: 4px 8px;
}

.loading {
  padding: 20px;
  color: #555;
  text-align: center;
}
</style>
