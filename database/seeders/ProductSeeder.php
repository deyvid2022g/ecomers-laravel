<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            $products = $this->getProductsForCategory($category->name);
            foreach ($products as $product) {
                Product::create([
                    'name' => $product['name'],
                    'description' => $product['description'],
                    'price' => $product['price'],
                    'stock' => rand(10, 100),
                    'image' => $product['image'],
                    'active' => true,
                    'category_id' => $category->id
                ]);
            }
        }
    }

    private function getProductsForCategory($categoryName): array
    {
        return match($categoryName) {
            'Electronics' => [
                [
                    'name' => 'Smart 4K TV',
                    'description' => '55-inch 4K Ultra HD Smart LED TV with HDR',
                    'price' => 699.99,
                    'image' => 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'
                ],
                [
                    'name' => 'Smartphone Pro',
                    'description' => 'Latest flagship smartphone with 5G capability',
                    'price' => 999.99,
                    'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
                ]
            ],
            'Wearables' => [
                [
                    'name' => 'Smart Watch Elite',
                    'description' => 'Advanced fitness tracking and notifications',
                    'price' => 299.99,
                    'image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
                ],
                [
                    'name' => 'Fitness Band Pro',
                    'description' => '24/7 heart rate and sleep monitoring',
                    'price' => 79.99,
                    'image' => 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80'
                ]
            ],
            'Cameras' => [
                [
                    'name' => 'DSLR Camera Pro',
                    'description' => 'Professional grade DSLR with 4K video',
                    'price' => 1299.99,
                    'image' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'
                ],
                [
                    'name' => 'Mirrorless Camera',
                    'description' => 'Compact mirrorless camera with advanced features',
                    'price' => 899.99,
                    'image' => 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&q=80'
                ]
            ],
            'Fashion' => [
                [
                    'name' => 'Designer Leather Jacket',
                    'description' => 'Premium leather jacket with modern design',
                    'price' => 299.99,
                    'image' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
                ],
                [
                    'name' => 'Classic Denim Jeans',
                    'description' => 'High-quality denim with perfect fit',
                    'price' => 79.99,
                    'image' => 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'
                ]
            ],
            'Laptops' => [
                [
                    'name' => 'Ultra Slim Laptop',
                    'description' => 'Powerful laptop with long battery life',
                    'price' => 1299.99,
                    'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
                ],
                [
                    'name' => 'Gaming Laptop Pro',
                    'description' => 'High-performance gaming laptop',
                    'price' => 1999.99,
                    'image' => 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'
                ]
            ],
            'Audio' => [
                [
                    'name' => 'Premium Wireless Headphones',
                    'description' => 'Active noise cancelling headphones with premium sound quality',
                    'price' => 349.99,
                    'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
                ],
                [
                    'name' => 'Portable Bluetooth Speaker',
                    'description' => 'Waterproof portable speaker with 24-hour battery life',
                    'price' => 129.99,
                    'image' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
                ]
            ],
            'Gaming' => [
                [
                    'name' => 'Gaming Console Pro',
                    'description' => 'Next-gen gaming console with 4K support',
                    'price' => 499.99,
                    'image' => 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80'
                ],
                [
                    'name' => 'Wireless Gaming Controller',
                    'description' => 'Ergonomic design with advanced features',
                    'price' => 69.99,
                    'image' => 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80'
                ]
            ],
            'Sports & Fitness' => [
                [
                    'name' => 'Premium Yoga Mat',
                    'description' => 'Non-slip exercise yoga mat',
                    'price' => 49.99,
                    'image' => 'https://images.unsplash.com/photo-1601925260368-ae2f83cf9000?w=800&q=80'
                ],
                [
                    'name' => 'Adjustable Dumbbells',
                    'description' => 'Space-saving adjustable weight set',
                    'price' => 299.99,
                    'image' => 'https://images.unsplash.com/photo-1586401100295-7a5093aa7f9f?w=800&q=80'
                ]
            ],
            'Home & Living' => [
                [
                    'name' => 'Smart LED Light Set',
                    'description' => 'WiFi-enabled color changing lights',
                    'price' => 79.99,
                    'image' => 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80'
                ],
                [
                    'name' => 'Modern Coffee Table',
                    'description' => 'Stylish wooden coffee table',
                    'price' => 199.99,
                    'image' => 'https://images.unsplash.com/photo-1532372320978-9d96d0b98af2?w=800&q=80'
                ]
            ],
            'Beauty & Personal Care' => [
                [
                    'name' => 'Skincare Set',
                    'description' => 'Complete premium skincare routine',
                    'price' => 89.99,
                    'image' => 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'
                ],
                [
                    'name' => 'Hair Care Bundle',
                    'description' => 'Professional hair care products',
                    'price' => 59.99,
                    'image' => 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'
                ]
            ],
            'Books & Media' => [
                [
                    'name' => 'Bestseller Collection',
                    'description' => 'Top 5 bestselling books bundle',
                    'price' => 99.99,
                    'image' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'
                ],
                [
                    'name' => 'Premium E-Reader',
                    'description' => 'Waterproof e-reader with backlight',
                    'price' => 129.99,
                    'image' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'
                ]
            ],
            'Toys & Games' => [
                [
                    'name' => 'Educational Robot Kit',
                    'description' => 'STEM learning robot building set',
                    'price' => 79.99,
                    'image' => 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=800&q=80'
                ],
                [
                    'name' => 'Strategy Board Game',
                    'description' => 'Classic strategy game set',
                    'price' => 39.99,
                    'image' => 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80'
                ]
            ],
            'Automotive' => [
                [
                    'name' => 'Car Care Kit',
                    'description' => 'Complete auto detailing set',
                    'price' => 89.99,
                    'image' => 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80'
                ],
                [
                    'name' => 'Dash Camera',
                    'description' => 'HD dash cam with night vision',
                    'price' => 149.99,
                    'image' => 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80'
                ]
            ],
            default => []
        };
    }
}