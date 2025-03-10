<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'total'
    ];

    protected $casts = [
        'total' => 'decimal:2'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($cart) {
            if (!in_array($cart->status, ['active', 'completed', 'abandoned'])) {
                throw new \InvalidArgumentException('Invalid cart status');
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function calculateTotal(): void
    {
        DB::transaction(function () {
            $this->total = $this->items()
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->where('products.active', true)
                ->sum(DB::raw('cart_items.quantity * products.price'));
            $this->save();
        });
    }
}