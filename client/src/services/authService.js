import api from './api';

export const login = async (credentials) => {
    const res = await api.post('/users/login', credentials);
    return res.data;
};

export const register = async (userData) => {
    const res = await api.post('/users/register', userData);
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await api.get('/users/me');
    return res.data;
};