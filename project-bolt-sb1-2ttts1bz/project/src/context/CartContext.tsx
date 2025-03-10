import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';
import type { Product } from '../types';

interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  showCart: boolean;
}

type CartAction =
  | { type: 'FETCH_CART_START' }
  | { type: 'FETCH_CART_SUCCESS'; payload: { items: CartItem[]; total: number } }
  | { type: 'FETCH_CART_ERROR'; payload: string }
  | { type: 'UPDATE_CART'; payload: { items: CartItem[]; total: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SHOW_CART'; payload: boolean };

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  showCart: false
};

const CartContext = createContext<{
  state: CartState;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setShowCart: (show: boolean) => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'FETCH_CART_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_CART_SUCCESS':
    case 'UPDATE_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        loading: false,
        error: null
      };
    case 'FETCH_CART_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_CART':
      return {
        ...initialState
      };
    case 'SET_SHOW_CART':
      return {
        ...state,
        showCart: action.payload
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { state: authState } = useAuth();

  useEffect(() => {
    // Only fetch cart if user is logged in
    if (authState.user) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [authState.user]);

  const fetchCart = async () => {
    try {
      dispatch({ type: 'FETCH_CART_START' });
      const cart = await cartService.getCart();
      dispatch({
        type: 'FETCH_CART_SUCCESS',
        payload: { items: cart.items, total: cart.total }
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CART_ERROR',
        payload: 'Failed to fetch cart'
      });
    }
  };

  const addItem = async (productId: number, quantity: number) => {
    try {
      if (!authState.user) {
        throw new Error('Please login to add items to cart');
      }
      const cart = await cartService.addItem(productId, quantity);
      dispatch({
        type: 'UPDATE_CART',
        payload: { items: cart.items, total: cart.total }
      });
      dispatch({ type: 'SET_SHOW_CART', payload: true });
    } catch (error) {
      dispatch({
        type: 'FETCH_CART_ERROR',
        payload: 'Failed to add item to cart'
      });
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    try {
      const cart = await cartService.updateItem(itemId, quantity);
      dispatch({
        type: 'UPDATE_CART',
        payload: { items: cart.items, total: cart.total }
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CART_ERROR',
        payload: 'Failed to update cart item'
      });
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const cart = await cartService.removeItem(itemId);
      dispatch({
        type: 'UPDATE_CART',
        payload: { items: cart.items, total: cart.total }
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CART_ERROR',
        payload: 'Failed to remove item from cart'
      });
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      dispatch({
        type: 'FETCH_CART_ERROR',
        payload: 'Failed to clear cart'
      });
    }
  };

  const setShowCart = (show: boolean) => {
    dispatch({ type: 'SET_SHOW_CART', payload: show });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        setShowCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}