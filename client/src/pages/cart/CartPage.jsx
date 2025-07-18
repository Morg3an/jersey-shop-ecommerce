import React from 'react';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { items, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return <p className="p-4">Your cart is empty.</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="border p-2 rounded shadow-sm">
                        <p><strong>{item.product.name}</strong> x {item.quantity}</p>
                        <button
                            className="text-red-500 text-sm"
                            onClick={() => removeFromCart(index)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex gap-4 mt-4">
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate('/checkout')}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;