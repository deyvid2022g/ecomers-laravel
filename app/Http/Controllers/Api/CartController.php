<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $cart = Cart::with(['items.product'])
                ->where('user_id', $request->user()->id)
                ->where('status', 'active')
                ->first();

            if (!$cart) {
                $cart = Cart::create([
                    'user_id' => $request->user()->id,
                    'status' => 'active',
                    'total' => 0
                ]);
                Log::info('Nuevo carrito creado para el usuario: ' . $request->user()->id);
            }

            return response()->json($cart);
        } catch (\Exception $e) {
            Log::error('Error al obtener el carrito: ' . $e->getMessage());
            return response()->json(['error' => 'Error al procesar la solicitud'], 500);
        }
    }

    public function addItem(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1'
            ]);

            $product = Product::where('id', $request->product_id)
                ->where('active', true)
                ->firstOrFail();

            if ($product->stock < $request->quantity) {
                return response()->json([
                    'error' => 'No hay suficiente stock disponible'
                ], 422);
            }

            DB::transaction(function () use ($request, $product, &$cart, &$cartItem) {
                $cart = Cart::firstOrCreate(
                    [
                        'user_id' => $request->user()->id,
                        'status' => 'active'
                    ],
                    ['total' => 0]
                );
                
                $cartItem = CartItem::updateOrCreate(
                    [
                        'cart_id' => $cart->id,
                        'product_id' => $product->id
                    ],
                    [
                        'quantity' => $request->quantity,
                        'price' => $product->price
                    ]
                );
            });

            Log::info('Producto agregado al carrito', [
                'user_id' => $request->user()->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity
            ]);

            return response()->json([
                'message' => 'Producto agregado al carrito',
                'cart' => $cart->load('items.product')
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        } catch (\Exception $e) {
            Log::error('Error al agregar producto al carrito: ' . $e->getMessage());
            return response()->json(['error' => 'Error al procesar la solicitud'], 500);
        }
    }

    public function updateItem(Request $request, CartItem $item): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        if ($item->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->update([
            'quantity' => $request->quantity
        ]);

        return response()->json(['message' => 'Cart item updated', 'cart' => $item->cart->load('items.product')]);
    }

    public function removeItem(Request $request, CartItem $item): JsonResponse
    {
        if ($item->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item removed from cart', 'cart' => $item->cart->load('items.product')]);
    }

    public function clear(Request $request): JsonResponse
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->first();

        if ($cart) {
            $cart->items()->delete();
            $cart->update(['total' => 0]);
        }

        return response()->json(['message' => 'Cart cleared']);
    }
}