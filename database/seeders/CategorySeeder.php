<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics', 'description' => 'Electronic devices and gadgets'],
            ['name' => 'Wearables', 'description' => 'Smart watches and wearable technology'],
            ['name' => 'Cameras', 'description' => 'Digital cameras and photography equipment'],
            ['name' => 'Fashion', 'description' => 'Clothing and fashion accessories'],
            ['name' => 'Laptops', 'description' => 'Laptops and computing devices'],
            ['name' => 'Audio', 'description' => 'Headphones and audio equipment'],
            ['name' => 'Gaming', 'description' => 'Gaming consoles and accessories'],
            ['name' => 'Sports & Fitness', 'description' => 'Sports equipment and fitness gear'],
            ['name' => 'Home & Living', 'description' => 'Home decor and living essentials'],
            ['name' => 'Beauty & Personal Care', 'description' => 'Beauty products and personal care items'],
            ['name' => 'Books & Media', 'description' => 'Books, movies, and media content'],
            ['name' => 'Toys & Games', 'description' => 'Toys and board games'],
            ['name' => 'Automotive', 'description' => 'Car accessories and automotive parts']
        ];

        foreach ($categories as $category) {
            $category['slug'] = Str::slug($category['name']);
            Category::create($category);
        }
    }
}