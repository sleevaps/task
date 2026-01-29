import type { Nutrition } from '@/types/nutrition'
import type { DishIngredient } from './dishes.api'

export const calcNutrition = (ingredients: any[]): Nutrition => {
  return ingredients.reduce(
    (sum, item) => {
      const p = item.expand.product
      const k = item.weight / 100

      sum.calories += p.calories * k
      sum.protein += p.protein * k
      sum.fat += p.fat * k
      sum.carbs += p.carbs * k

      return sum
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  )
}

export const roundNutrition = (n: Nutrition): Nutrition => ({
  calories: Number(n.calories.toFixed(2)),
  protein: Number(n.protein.toFixed(2)),
  fat: Number(n.fat.toFixed(2)),
  carbs: Number(n.carbs.toFixed(2))
})
