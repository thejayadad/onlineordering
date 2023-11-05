'use client'
import React, { useEffect, useState } from 'react';

const ProductDetail = (ctx) => {
  const [productDetails, setProductDetails] = useState({});
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedExtraOptions, setSelectedExtraOptions] = useState([]);
  const [selectedPrep, setSelectedPrep] = useState(''); // For the prep dropdown
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`http://localhost:3000/api/product/${ctx.params.id}`, {
        cache: 'no-store',
      });
      const product = await res.json();
      setProductDetails(product);
    }
    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    // Here, you can collect all the selected options and quantities
    // and perform any logic for adding the product to the cart.
    // You can use the state variables to access the selected data.
    // For example, selectedSides, selectedDrinks, selectedExtraOptions,
    // selectedPrep, quantity, and instructions.
    console.log('Product added to cart:', {
      productDetails,
      selectedSides,
      selectedDrinks,
      selectedExtraOptions,
      selectedPrep,
      quantity,
      instructions,
    });
  };

  return (
    <section className='px-4 py-12'>
      <div className='max-w-screen-xl mx-auto'>
        <div className='' key={productDetails?.id}>
          <h2>Product Details</h2>
          <p>{productDetails?.title}</p>
          <p>{productDetails?.desc}</p>
          <p>Price: ${productDetails?.prices?.[0]}</p>

          {/* Sides Selection */}
          <h3>Select Sides:</h3>
          {productDetails?.sides?.map((side, index) => (
            <label key={index}>
              <input
                type='checkbox'
                value={side.text}
                checked={selectedSides.includes(side.text)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSides([...selectedSides, side.text]);
                  } else {
                    setSelectedSides(selectedSides.filter((item) => item !== side.text));
                  }
                }}
              />
              {side.text} (+${side.price})
            </label>
          ))}

          {/* Drinks Selection */}
          <h3>Select Drinks:</h3>
          {productDetails?.drinks?.map((drink, index) => (
            <label key={index}>
              <input
                type='checkbox'
                value={drink.text}
                checked={selectedDrinks.includes(drink.text)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDrinks([...selectedDrinks, drink.text]);
                  } else {
                    setSelectedDrinks(selectedDrinks.filter((item) => item !== drink.text));
                  }
                }}
              />
              {drink.text} (+${drink.price})
            </label>
          ))}

          {/* Extra Options Selection */}
          <h3>Select Extra Options:</h3>
          {productDetails?.extraOptions?.map((option, index) => (
            <label key={index}>
              <input
                type='checkbox'
                value={option.text}
                checked={selectedExtraOptions.includes(option.text)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedExtraOptions([...selectedExtraOptions, option.text]);
                  } else {
                    setSelectedExtraOptions(selectedExtraOptions.filter((item) => item !== option.text));
                  }
                }}
              />
              {option.text} (+${option.price})
            </label>
          ))}

          {/* Preparation Selection */}
          <h3>Select Preparation:</h3>
          <select
            value={selectedPrep}
            onChange={(e) => setSelectedPrep(e.target.value)}
          >
            <option value=''>Select Prep</option>
            <option value='fried'>Fried</option>
            <option value='steam'>Steam</option>
            <option value='raw'>Raw</option>
          </select>

          {/* Quantity Selection */}
          <h3>Quantity:</h3>
          <input
            type='number'
            min='1'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          {/* Instructions */}
          <h3>Instructions:</h3>
          <textarea
            rows='4'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
