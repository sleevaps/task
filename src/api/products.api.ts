import { pb } from './pocketbase'
import type { Nutrition } from '@/types/nutrition'

export interface Product extends Nutrition {
  id: string
  name: string
}

export const productsApi = {
  list() {
    return pb.collection('products').getFullList<Product>()
  },

  get(id: string) {
    return pb.collection('products').getOne<Product>(id)
  },

  create(data: Omit<Product, 'id'>) {
    return pb.collection('products').create<Product>(data)
  },

  update(id: string, data: Partial<Omit<Product, 'id'>>) {
    return pb.collection('products').update<Product>(id, data)
  },

  delete(id: string) {
    return pb.collection('products').delete(id)
  }
}
