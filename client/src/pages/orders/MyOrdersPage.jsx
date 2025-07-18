import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../../services/orderService';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (err) {
                console.error('Failed to load orders:', err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <ul className="space-y-2">
                    {orders.map(order => (
                        <li key={order._id} className="border p-3 rounded shadow">
                            <p>Order ID: {order._id}</p>
                            <p>Product: {order.product?.name || 'Unknown'}</p>
                            <p>Status: {order.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrdersPage;