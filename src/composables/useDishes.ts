import { ref } from 'vue'
import { dishesApi } from '@/api/dishes.api'
import { calcNutrition, roundNutrition } from '@/api/nutrition'
import type { Dish } from '@/api/dishes.api'


export function useDishes() { 
    const dishes = ref<Dish[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function loadDishes() {
        try {
            loading.value = true
            error.value = null
            dishes.value = await dishesApi.listDishes()
        } catch (e: any) {
            error.value = e.message || "Ошибка загрузки блюд"
        } finally {
            loading.value = false
        }
    }

    async function createDish(name: string) {
        const dish = await dishesApi.createDish(name)
        dishes.value.push(dish)
        return dish
    }

    async function addIngredient(
        dishId: string,
        productId: string,
        weight: number
    ) {
        await dishesApi.addIngredient(dishId, productId, weight)
        await recalcNutrition(dishId)
    }

    async function recalcNutrition(dishId: string) {
        const ingredients = await dishesApi.getIngredients(dishId)
        const nutrition = roundNutrition(calcNutrition(ingredients))
        await dishesApi.updateNutrition(dishId, nutrition)

        const dish = dishes.value.find(d => d.id === dishId)
        if (dish) Object.assign(dish, nutrition)
    }

    return {
        dishes,
        loading,
        error,
        loadDishes,
        createDish,
        addIngredient,
        recalcNutrition
    }
}