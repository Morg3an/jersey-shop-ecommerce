import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as productService from '../../services/productService';
import useCart from '../../hooks/useCart';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [customization, setCustomization] = useState({
        nameOnShirt: '',
        number: '',
        colorChoice: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setCustomization({
            ...customization,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity, customization);
        alert('Added to cart!');
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;
    if (!product) return <p className="p-4">Product not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product image */}
                <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-auto rounded"
                />

                {/* Product info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-lg mb-4 text-gray-700">Ksh {product.price}</p>
                    <p className="mb-4 text-gray-600">{product.description}</p>

                    {/* Quantity */}
                    <div className="mb-4">
                        <label className="block">Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border p-2 w-full"
                        />
                    </div>

                    {/* Customization fields */}
                    <div className="mb-2">
                        <label className="block">Name on Shirt (optional)</label>
                        <input
                            type="text"
                            name="nameOnShirt"
                            value={customization.nameOnShirt}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block">Number (optional)</label>
                        <input
                            type="text"
                            name="number"
                            value={customization.number}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Color Choice (optional)</label>
                        <input
                            type="text"
                            name="colorChoice"
                            value={customization.colorChoice}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;