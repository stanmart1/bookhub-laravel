<?php

namespace App\Services;

use App\Models\Book;

class CartService
{
    public function getCart()
    {
        return session()->get('cart', []);
    }

    public function addItem($bookId, $quantity)
    {
        $cart = $this->getCart();
        if (isset($cart[$bookId])) {
            $cart[$bookId]['quantity'] += $quantity;
        } else {
            $book = Book::findOrFail($bookId);
            $cart[$bookId] = [
                'book_id' => $bookId,
                'title' => $book->title,
                'price' => $book->price,
                'quantity' => $quantity,
            ];
        }
        session(['cart' => $cart]);
        return $cart;
    }

    public function updateItem($bookId, $quantity)
    {
        $cart = $this->getCart();
        if (isset($cart[$bookId])) {
            $cart[$bookId]['quantity'] = $quantity;
            session(['cart' => $cart]);
        }
        return $cart;
    }

    public function removeItem($bookId)
    {
        $cart = $this->getCart();
        if (isset($cart[$bookId])) {
            unset($cart[$bookId]);
            session(['cart' => $cart]);
        }
        return $cart;
    }

    public function clearCart()
    {
        session()->forget('cart');
        return [];
    }
}
