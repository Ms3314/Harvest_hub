import React from 'react'
import ProductCard from './ProductCard'

const products = Array(3).fill({
    name: 'Dhania Crop',
    price: 100,
    minOrder: 30,
  });

function  MySellComponent() {
    function handleAddToCart (index:number) {
        const sa11 = index
    }

    function handleChat (index:number) {
        const sami = index
    }
  return (
    <>
    <div className='w-full'>
        <p>this will be my selling wala compoenrnt</p>
        <div className="ml-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    </>
  )
}

export default MySellComponent