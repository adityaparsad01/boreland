import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        imageUrl: initialData.imageUrl || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 border border-gray-800">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={product.description}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://placehold.co/600x400"
          required
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit">
          Save Product
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/admin/products')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
