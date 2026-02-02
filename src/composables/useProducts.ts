import { ref } from 'vue'
import { productsApi } from '@/api/products.api'
import type { Product } from '@/api/products.api'

export function useProducts() {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function loadProducts() {
        try { 
            loading.value = true
            error.value = null
            products.value = await productsApi.list()
        } catch (e:any) {
            error.value = e.message || "Ошибка загрузки продуктов"
        } finally {
            loading.value = false
        }
    }

    async function createProduct(data: Omit<Product, 'id'>) {
        const product = await productsApi.create(data)
        products.value.push(product)
        return product
    }

    async function updateProduct(
        id: string,
        data: Partial<Omit<Product, 'id'>>
    ) {
       const updated = await productsApi.update(id, data)
       const idx = products.value.findIndex(p => p.id === id)
       if (idx !== -1) products.value[idx] = updated
       return updated 
    }

    async function deleteProduct(id: string) {
        await productsApi.delete(id)
        products.value = products.value.filter(p => p.id !== id)
    }

    return {
        products,
        loading,
        error,
        loadProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }
}