import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (err) {
                console.error('Failed to fetch order:', err);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) return <p className="p-4">Loading order details...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Product:</strong> {order.product?.name || 'Unknown'}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Customization:</strong></p>
            <ul className="list-disc ml-6">
                <li>Name: {order.customization?.nameOnShirt || 'N/A'}</li>
                <li>Number: {order.customization?.number || 'N/A'}</li>
                <li>Color: {order.customization?.colorChoice || 'N/A'}</li>
            </ul>
        </div>
    );
};

export default OrderDetailsPage;