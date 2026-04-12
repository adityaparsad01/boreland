import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import ProductForm from '../../components/admin/ProductForm';

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const productToEdit = getProductById(parseInt(productId, 10));

  const handleSubmit = (updatedData) => {
    updateProduct(parseInt(productId, 10), updatedData);
    navigate('/admin/products');
  };

  if (!productToEdit) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-dark-text mb-6">Product Not Found</h1>
        <p>The product you are trying to edit does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-text mb-6">Edit Product</h1>
      <ProductForm onSubmit={handleSubmit} initialData={productToEdit} />
    </div>
  );
};

export default EditProductPage;
