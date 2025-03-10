import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product.id, 1);
  };

  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
      <div className="relative group">
        <div className="relative pb-[100%] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="absolute top-4 right-4 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-200">
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
            {product.category.name}
          </span>
          <span className="text-xl font-bold text-indigo-600 tracking-tight">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : Number(product.price).toFixed(2)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500">(48)</span>
          </div>
          <span className="text-sm font-medium text-emerald-600">In Stock</span>
        </div>
      </div>
    </div>
  );
}