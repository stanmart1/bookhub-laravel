<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class CartController extends Controller
{
    // View cart
    public function index(Request $request)
    {
        $cart = session()->get('cart', []);
        return response()->json($cart);
    }

    // Add item to cart
    public function add(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $cart = session()->get('cart', []);
        $bookId = $request->book_id;
        $quantity = $request->quantity;
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
        return response()->json($cart);
    }

    // Update item quantity
    public function update(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $cart = session()->get('cart', []);
        $bookId = $request->book_id;
        $quantity = $request->quantity;
        if (isset($cart[$bookId])) {
            $cart[$bookId]['quantity'] = $quantity;
            session(['cart' => $cart]);
        }
        return response()->json($cart);
    }

    // Remove item from cart
    public function remove(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);
        $cart = session()->get('cart', []);
        $bookId = $request->book_id;
        if (isset($cart[$bookId])) {
            unset($cart[$bookId]);
            session(['cart' => $cart]);
        }
        return response()->json($cart);
    }

    // Clear cart
    public function clear()
    {
        session()->forget('cart');
        return response()->json([]);
    }

    // Sync cart on login (placeholder for future DB sync)
    public function syncCartOnLogin(Request $request)
    {
        // In a real implementation, merge session cart with user's DB cart here
        // For now, just return the session cart
        $cart = session()->get('cart', []);
        return response()->json($cart);
    }
}
