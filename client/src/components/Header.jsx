import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">Jersey Shop</Link>

            <nav className="flex items-center gap-4">
                <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>

                {user ? (
                    <>
                        <Link to="/orders" className="text-gray-700 hover:text-blue-600">My Orders</Link>
                        {user.isAdmin && (
                            <Link to="/admin/dashboard" className="text-gray-700 hover:text-red-600">Admin</Link>
                        )}
                        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                        <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;