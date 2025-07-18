import api from './api';

export const placeOrder = async (orderData) => {
    const res = await api.post('/orders', orderData);
    return res.data.order;
};

export const getMyOrders = async () => {
    const res = await api.get('/orders/me');
    return res.data.orders;
};

export const getOrderById = async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data.order;
};

export const getAllOrders = async () => {
    const res = await api.get('/orders');
    return res.data.orders;
};

export const updateOrderStatus = async (id, status) => {
    const res = await api.patch(`/orders/${id}/status`, { status });
    return res.data.order;
};

export const cancelOrder = async (id) => {
    const res = await api.patch(`/orders/${id}/cancel`);
    return res.data.order;
};

export const deleteOrder = async (id) => {
    const res = await api.delete(`/orders/${id}`);
    return res.data;
};