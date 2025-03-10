export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  products?: Product[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}