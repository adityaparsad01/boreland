import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import StarRating from '../components/products/StarRating';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const product = getProductById(parseInt(productId, 10));

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.variants?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.variants?.sizes?.[0] || null);
  
  useEffect(() => {
    // Reset selections if product changes
    setSelectedColor(product?.variants?.colors?.[0] || null);
    setSelectedSize(product?.variants?.sizes?.[0] || null);
    setQuantity(1);
  }, [productId, product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Product Not Found</h1>
        <p className="text-dark-text mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products"><Button variant="secondary">Back to Collection</Button></Link>
      </div>
    );
  }

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Future enhancement: show a toast notification
  };

  return (
    <div className="pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        <div className="bg-surface p-4"><img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover" /></div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating.average} />
            <span className="text-sm text-secondary">({product.rating.count} reviews)</span>
          </div>
          <p className="text-3xl font-serif text-secondary mb-6">${product.price.toFixed(2)}</p>
          <p className="text-dark-text leading-relaxed mb-8">{product.description}</p>
          
          {product.variants.colors?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">Color: <span className="text-primary">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-2">{product.variants.colors.map(color => (
                <button key={color} onClick={() => setSelectedColor(color)} className={`py-1 px-4 border text-sm transition-colors ${selectedColor === color ? 'border-primary text-primary' : 'border-gray-700 text-secondary hover:border-secondary'}`}>{color}</button>
              ))}</div>
            </div>
          )}
          
          {product.variants.sizes?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">Size: <span className="text-primary">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">{product.variants.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`py-1 px-4 border text-sm transition-colors ${selectedSize === size ? 'border-primary text-primary' : 'border-gray-700 text-secondary hover:border-secondary'}`}>{size}</button>
              ))}</div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {product.specifications?.length > 0 && (
          <details className="group bg-surface border border-gray-800 p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg text-primary">Specifications<span className="text-secondary transition-transform duration-300 group-open:rotate-180">▼</span></summary>
            <ul className="mt-4 text-dark-text list-disc pl-5 space-y-2">
              {product.specifications.map(spec => <li key={spec.name}><strong>{spec.name}:</strong> {spec.value}</li>)}
            </ul>
          </details>
        )}
        <details className="group bg-surface border border-gray-800 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg text-primary">Reviews ({product.rating.count})<span className="text-secondary transition-transform duration-300 group-open:rotate-180">▼</span></summary>
          <div className="mt-4 space-y-6">
            {product.reviews?.length > 0 ? product.reviews.map(review => (
              <div key={review.id} className="border-b border-gray-800 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-primary">{review.author}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                <p className="text-dark-text">{review.comment}</p>
              </div>
            )) : <p className="text-dark-text">No reviews yet. Be the first to share your thoughts!</p>}
          </div>
        </details>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-sm border-t border-surface z-40">
        <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-row justify-end items-center gap-4">
          <div className="flex items-center gap-2 bg-surface border border-gray-700 p-1">
            <button onClick={() => handleQuantityChange(-1)} className="flex items-center justify-center w-12 h-12 text-secondary text-2xl font-light hover:text-primary">-</button>
            <span className="font-medium text-primary w-12 text-center text-lg">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="flex items-center justify-center w-12 h-12 text-secondary text-2xl font-light hover:text-primary">+</button>
          </div>
          <Button onClick={handleAddToCart} className="w-full sm:w-auto flex-grow sm:flex-grow-0">Add {quantity} to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
