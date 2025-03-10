import React, { useEffect, useState } from 'react';
import { Smartphone, Watch, Camera, ShoppingBag, Laptop, Headphones, Gamepad, Shirt, Book, Gift, Home, Car, Dumbbell, Palette } from 'lucide-react';
import { fetchCategories } from '../services/api';
import type { Category } from '../types';

const categoryIcons: { [key: string]: any } = {
  'Electronics': { icon: Smartphone, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
  'Wearables': { icon: Watch, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600' },
  'Cameras': { icon: Camera, color: 'bg-green-500', gradient: 'from-green-500 to-green-600' },
  'Fashion': { icon: Shirt, color: 'bg-pink-500', gradient: 'from-pink-500 to-pink-600' },
  'Laptops': { icon: Laptop, color: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-600' },
  'Audio': { icon: Headphones, color: 'bg-red-500', gradient: 'from-red-500 to-red-600' },
  'Gaming': { icon: Gamepad, color: 'bg-yellow-500', gradient: 'from-yellow-500 to-yellow-600' },
  'Sports & Fitness': { icon: Dumbbell, color: 'bg-emerald-500', gradient: 'from-emerald-500 to-emerald-600' },
  'Home & Living': { icon: Home, color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-600' },
  'Beauty & Personal Care': { icon: Palette, color: 'bg-rose-500', gradient: 'from-rose-500 to-rose-600' },
  'Books & Media': { icon: Book, color: 'bg-cyan-500', gradient: 'from-cyan-500 to-cyan-600' },
  'Toys & Games': { icon: Gift, color: 'bg-violet-500', gradient: 'from-violet-500 to-violet-600' },
  'Automotive': { icon: Car, color: 'bg-slate-500', gradient: 'from-slate-500 to-slate-600' }
};

interface FeaturedCategoriesProps {
  onCategorySelect?: (categoryId: number | null) => void;
  selectedCategoryId?: number | null;
}

export default function FeaturedCategories({ onCategorySelect, selectedCategoryId }: FeaturedCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white text-center">
        <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Explore our wide range of products across various categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div
            key="all"
            className={`group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${!selectedCategoryId ? 'ring-2 ring-indigo-500' : ''}`}
            onClick={() => onCategorySelect?.(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-500 to-gray-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">All Products</h3>
              <p className="text-sm text-gray-500">View everything</p>
            </div>
          </div>
          {categories.map((category) => {
            const iconData = categoryIcons[category.name] || { icon: ShoppingBag, color: 'bg-gray-500', gradient: 'from-gray-500 to-gray-600' };
            return (
              <div
                key={category.id}
                className={`group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${selectedCategoryId === category.id ? 'ring-2 ring-indigo-500' : ''}`}
                onClick={() => onCategorySelect?.(category.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`bg-gradient-to-br ${iconData.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {React.createElement(iconData.icon, { className: 'h-8 w-8 text-white' })}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  {category.products && (
                    <p className="text-sm text-gray-500">{category.products.length}+ Products</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}