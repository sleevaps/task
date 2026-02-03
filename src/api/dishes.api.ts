import { pb } from './pocketbase'
import type { Nutrition } from '@/types/nutrition'

export interface Dish extends Nutrition {
  id: string
  name: string
  description: string
  image?: string
  created?: string
  updated?: string
}

export interface DishIngredient {
  id: string
  dish: string
  product: string
  weight: number
  expand?: {
    product: Nutrition & {
      id: string
      name: string
    }
  }
}

export const dishesApi = {
  async createDish(data: {
    name: string
    description: string
    image?: File
  }) {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)

    formData.append('calories', '0')
    formData.append('protein', '0')
    formData.append('fat', '0')
    formData.append('carbs', '0')

    if (data.image) {
      formData.append('image', data.image)
    }

    return pb.collection('dishes').create<Dish>(formData)
  },

  async listDishes() {
    return pb.collection('dishes').getFullList<Dish>({
      sort: '-created'
    })
  },

  async getDish(id: string) {
    return pb.collection('dishes').getOne<Dish>(id)
  },

  async addIngredient(
    dishId: string,
    productId: string,
    weight: number
  ) {
    return pb.collection('dish_ingredients').create<DishIngredient>({
      dish: dishId,
      product: productId,
      weight
    })
  },

  async getIngredients(dishId: string) {
    return pb.collection('dish_ingredients').getFullList<DishIngredient>({
      filter: `dish="${dishId}"`,
      expand: 'product'
    })
  },

  async updateNutrition(dishId: string, nutrition: Nutrition) {
    return pb.collection('dishes').update<Dish>(dishId, nutrition)
  },

  async removeIngredient(id: string) {
    return pb.collection('dish_ingredients').delete(id)
  },

  async deleteDish(id: string) {
    return pb.collection('dishes').delete(id)
  },

  getImageUrl(dish: Dish) {
    if (!dish.image) return null
    return pb.files.getUrl(dish, dish.image)
  }
}
