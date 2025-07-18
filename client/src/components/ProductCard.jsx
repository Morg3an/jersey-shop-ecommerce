import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product, 1); // quantity = 1, no customization
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition">
            <img
                src={product.image || '/placeholder.png'}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-700 mb-2">Price: KES {product.price}</p>

            <div className="flex gap-2 mt-3">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleGoToCart}
                    className="flex-1 bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                    Go to Cart
                </button>
            </div>

            <Link
                to={`/products/${product._id}`}
                className="block mt-3 text-blue-600 hover:underline text-sm text-center"
            >
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;