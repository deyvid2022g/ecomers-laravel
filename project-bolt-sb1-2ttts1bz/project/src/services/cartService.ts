import { api } from './api';
import type { Product } from '../types';

interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Cart {
  id: number;
  user_id: number;
  status: string;
  total: number;
  items: CartItem[];
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await api.get('/cart');
    return response.data;
  },

  async addItem(productId: number, quantity: number): Promise<Cart> {
    const response = await api.post('/cart/items', {
      product_id: productId,
      quantity
    });
    return response.data.cart;
  },

  async updateItem(itemId: number, quantity: number): Promise<Cart> {
    const response = await api.put(`/cart/items/${itemId}`, {
      quantity
    });
    return response.data.cart;
  },

  async removeItem(itemId: number): Promise<Cart> {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data.cart;
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  }
};