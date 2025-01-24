import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  minOrder: number;
  imageUrl?: string;
  onAddToCart: () => void;
  onChat: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  minOrder,
  imageUrl,
  onAddToCart,
  onChat,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-64">
      <div className="h-48 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-gray-600">Price: ₹{price}/kg</p>
          <p className="text-sm text-gray-500">Min order: {minOrder}kg</p>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
          >
            Add to cart
          </button>
          <button
            onClick={onChat}
            className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded-md text-sm hover:bg-green-50 transition-colors"
          >
            Chat now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 