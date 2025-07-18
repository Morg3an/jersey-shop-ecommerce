import React, { useState } from 'react';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import * as orderService from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { items = [], clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        phone: '',
        whatsapp: '',
        nameOnShirt: '',
        number: '',
        colorChoice: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || items.length === 0) return;

        setLoading(true);
        setError(null);

        try {
            await Promise.all(
                items.map((item) =>
                    orderService.placeOrder({
                        user: user._id,
                        product: item.product._id,
                        quantity: item.quantity,
                        customization: {
                            nameOnShirt: form.nameOnShirt,
                            number: form.number,
                            colorChoice: form.colorChoice,
                        },
                        contact: {
                            email: form.email,
                            phone: form.phone,
                            whatsapp: form.whatsapp,
                        },
                        status: 'pending',
                    })
                )
            );
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError('Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label>WhatsApp</label>
                        <input
                            type="text"
                            name="whatsapp"
                            value={form.whatsapp}
                            onChange={handleChange}
                            required
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label>Name on Shirt</label>
                        <input
                            type="text"
                            name="nameOnShirt"
                            value={form.nameOnShirt}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label>Number</label>
                        <input
                            type="text"
                            name="number"
                            value={form.number}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label>Color</label>
                        <input
                            type="text"
                            name="colorChoice"
                            value={form.colorChoice}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CheckoutPage;