import api from './api';

export const getAllProducts = async () => {
    const res = await api.get('/products');
    return res.data.products;
};

export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data.product;
};

export const createProduct = async (productData) => {
    const res = await api.post('/products', productData);
    return res.data.product;
};

export const updateProduct = async (id, updates) => {
    const res = await api.put(`/products/${id}`, updates);
    return res.data.product;
};

export const deleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
};