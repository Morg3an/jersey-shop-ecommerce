import { useEffect, useState } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import AdminNavbar from '../../components/AdminNavbar';
import ProductForm from './ProductForm';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await getAllProducts();
        setProducts(res);
    };

    const handleCreateOrUpdate = async (productData) => {
        if (editingProduct) {
            await updateProduct(editingProduct._id, productData);
        } else {
            await createProduct(productData);
        }
        setEditingProduct(null);
        fetchProducts();
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    return (
        <div>
            <AdminNavbar />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
                <ProductForm onSubmit={handleCreateOrUpdate} initialData={editingProduct} />
                <ul className="mt-6 space-y-2">
                    {products.map((product) => (
                        <li key={product._id} className="border p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-gray-600">Ksh {product.price}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductsPage;