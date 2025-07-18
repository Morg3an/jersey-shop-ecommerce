import { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setPrice(initialData.price || '');
            setImageUrl(initialData.imageUrl || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, price, imageUrl });
        setName('');
        setPrice('');
        setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block">Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block">Image URL</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{initialData ? 'Update' : 'Create'} Product</button>
        </form>
    );
};

export default ProductForm;