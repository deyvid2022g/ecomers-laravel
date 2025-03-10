import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { state, updateItem, removeItem, setShowCart } = useCart();

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateItem(itemId, newQuantity);
    } else {
      await removeItem(itemId);
    }
  };

  if (!state.showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCart(false)} />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {state.loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
              ) : state.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Your cart is empty</div>
                </div>
              ) : (
                <div className="space-y-8">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">${item.price}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 rounded-md hover:bg-gray-100 text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${state.total}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => console.log('Proceed to checkout')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}