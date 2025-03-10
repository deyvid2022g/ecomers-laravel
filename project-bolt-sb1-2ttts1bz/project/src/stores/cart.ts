import { defineStore } from 'pinia'
import axios from 'axios'

interface CartItem {
  id: number
  product: {
    id: number
    name: string
    image: string
  }
  quantity: number
  price: number
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    total: (state: CartState): string => {
      return state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0).toFixed(2)
    },
    itemCount: (state: CartState): number => {
      return state.items.reduce((count: number, item: CartItem) => count + item.quantity, 0)
    }
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/api/cart')
        this.items = response.data.items
      } catch (error) {
        this.error = 'Error loading cart'
        console.error('Error fetching cart:', error)
      } finally {
        this.loading = false
      }
    },

    async addToCart(productId: number, quantity: number = 1) {
      this.loading = true
      this.error = null
      try {
        await axios.post('/api/cart/items', { product_id: productId, quantity })
        await this.fetchCart()
      } catch (error) {
        this.error = 'Error adding item to cart'
        console.error('Error adding to cart:', error)
      } finally {
        this.loading = false
      }
    },

    async updateQuantity(itemId: number, quantity: number) {
      if (quantity < 1) return
      this.loading = true
      this.error = null
      try {
        await axios.put(`/api/cart/items/${itemId}`, { quantity })
        await this.fetchCart()
      } catch (error) {
        this.error = 'Error updating quantity'
        console.error('Error updating quantity:', error)
      } finally {
        this.loading = false
      }
    },

    async removeItem(itemId: number) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`/api/cart/items/${itemId}`)
        await this.fetchCart()
      } catch (error) {
        this.error = 'Error removing item'
        console.error('Error removing item:', error)
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        await axios.delete('/api/cart')
        this.items = []
      } catch (error) {
        this.error = 'Error clearing cart'
        console.error('Error clearing cart:', error)
      } finally {
        this.loading = false
      }
    }
  }
})