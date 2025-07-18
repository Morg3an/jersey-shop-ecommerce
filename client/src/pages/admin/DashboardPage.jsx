import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const DashboardPage = () => {
    return (
        <div className="p-6">
            <AdminNavbar />
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
            <p>Welcome, Admin! Use the sidebar or top menu to manage products and orders.</p>
        </div>
    );
};

export default DashboardPage;