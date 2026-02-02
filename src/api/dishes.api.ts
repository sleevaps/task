import { pb } from './pocketbase'
import type { Nutrition } from '@/types/nutrition'

export interface Dish extends Nutrition {
  id: string
  name: string
}

export interface DishIngredient {
  id: string
  dish: string
  product: string
  weight: number
}

export const dishesApi = {
  async createDish(name: string) {
    return pb.collection('dishes').create<Dish>({
      name,
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0
    })
  },

  async addIngredient(dishId: string, productId: string, weight: number) {
    return pb.collection('dish_ingredients').create<DishIngredient>({
      dish: dishId,
      product: productId,
      weight
    })
  },

  async listDishes() {
    return pb.collection('dishes').getFullList<Dish>()
  },

  async getIngredients(dishId: string) {
    return pb.collection('dish_ingredients').getFullList<DishIngredient>({
      filter: `dish="${dishId}"`,
      expand: 'product'
    })
  },

  async updateNutrition(dishId: string, nutrition: Nutrition) {
    return pb.collection('dishes').update(dishId, nutrition)
  }
}
