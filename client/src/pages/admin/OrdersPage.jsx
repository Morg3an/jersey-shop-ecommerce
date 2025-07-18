import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../services/orderService';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const data = await getAllOrders();
        setOrders(data);
    };

    const handleStatusUpdate = async (id, status) => {
        await updateOrderStatus(id, status);
        fetchOrders();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            await deleteOrder(id);
            fetchOrders();
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
            <table className="w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Order ID</th>
                        <th className="p-2 border">Product</th>
                        <th className="p-2 border">Qty</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className="p-2 border">{order._id}</td>
                            <td className="p-2 border">{order.product?.name}</td>
                            <td className="p-2 border">{order.quantity}</td>
                            <td className="p-2 border">{order.status}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    className="text-blue-600 hover:underline"
                                    onClick={() => handleStatusUpdate(order._id, 'shipped')}
                                >
                                    Mark Shipped
                                </button>
                                <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(order._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;