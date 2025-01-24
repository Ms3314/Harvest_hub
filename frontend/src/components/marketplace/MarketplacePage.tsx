import React from 'react';
import ProductCard from './ProductCard';

const MarketplacePage: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const products = Array(8).fill({
    name: 'Dhania Crop',
    price: 100,
    minOrder: 30,
  });

  const handleAddToCart = (productId: number) => {
    // Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  const handleChat = (productId: number) => {
    // Implement chat functionality
    console.log('Chat with seller:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Marketplace-specific Navigation Bar */}
      

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              minOrder={product.minOrder}
              onAddToCart={() => handleAddToCart(index)}
              onChat={() => handleChat(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage; 