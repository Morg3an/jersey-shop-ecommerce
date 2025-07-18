import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Product pages
import ProductListPage from './pages/products/ProductListPage';
import ProductDetails from './pages/products/ProductDetails';

// Order pages
import MyOrdersPage from './pages/orders/MyOrdersPage';
import OrderDetailsPage from './pages/orders/OrderDetailsPage';

// Admin pages
import DashboardPage from './pages/admin/DashboardPage';
import OrdersPage from './pages/admin/OrdersPage';
import ProductsPage from './pages/admin/ProductsPage';

// Cart & Checkout pages
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<ProductListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Protected user routes */}
            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <MyOrdersPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders/:id"
                element={
                    <ProtectedRoute>
                        <OrderDetailsPage />
                    </ProtectedRoute>
                }
            />

            {/* Admin routes */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute adminOnly>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/orders"
                element={
                    <ProtectedRoute adminOnly>
                        <OrdersPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products"
                element={
                    <ProtectedRoute adminOnly>
                        <ProductsPage />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;