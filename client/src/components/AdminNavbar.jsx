import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <nav className="bg-gray-800 text-white px-4 py-2 shadow-md">
            <ul className="flex gap-4">
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/">Go to Shop</Link></li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;