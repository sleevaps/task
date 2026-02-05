import { ref, onMounted } from 'vue'
import { dishesApi, type Dish } from '@/api/dishes.api'

export function useDishes() {
  const dishes = ref<Dish[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadDishes = async () => {
    loading.value = true
    error.value = null

    try {
      dishes.value = await dishesApi.listDishes()
    } catch (e) {
      console.error(e)
      error.value = 'Failed to load dishes'
    } finally {
      loading.value = false
    }
  }

  onMounted(loadDishes)

  return {
    dishes,
    loading,
    error,
    reload: loadDishes,
    getImageUrl: dishesApi.getImageUrl
  }
}
