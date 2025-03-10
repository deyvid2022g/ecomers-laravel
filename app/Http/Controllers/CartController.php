<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function addToCart(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            return DB::transaction(function () use ($request) {
                $product = Product::findOrFail($request->product_id);
                
                // Get or create active cart for the user
                $cart = Cart::firstOrCreate(
                    ['user_id' => Auth::id(), 'status' => 'active'],
                    ['total' => 0]
                );

                // Check if product already exists in cart
                $cartItem = $cart->items()->where('product_id', $product->id)->first();

                if ($cartItem) {
                    // Update existing cart item
                    $cartItem->update([
                        'quantity' => $cartItem->quantity + $request->quantity,
                        'price' => $product->price
                    ]);
                } else {
                    // Create new cart item
                    $cart->items()->create([
                        'product_id' => $product->id,
                        'quantity' => $request->quantity,
                        'price' => $product->price
                    ]);
                }

                $cart->refresh();

                return response()->json([
                    'message' => 'Product added to cart successfully',
                    'cart' => $cart->load('items.product')
                ]);
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add product to cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}