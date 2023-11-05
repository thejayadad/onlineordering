'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { AiFillShopping } from 'react-icons/ai'
import { useCartContext } from '@/lib/cartContext';
import { useDispatch } from "react-redux";
import { addProduct } from '@/redux/cartSlice';

const ProductDetail = (ctx) => {
  const [productDetails, setProductDetails] = useState({});
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedExtraOptions, setSelectedExtraOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [selectedPrep, setSelectedPrep] = useState(''); 
  const [selectedSize, setSelectedSize] = useState(3);
  const dispatch = useDispatch();


  const addQuantity = (command) => {
    setQuantity((prev) => {
      if (command === 'dec') {
        if (prev <= 1) return 1;
        else return prev - 1;
      }

      if (command === 'inc') {
        return prev + 1;
      }
    });
  };
  const calculateTotalPrice = () => {
    // Calculate the total price based on selected options
    let total = productDetails?.prices[selectedSize];

    selectedSides.forEach((sideText) => {
      const selectedSide = productDetails?.sides.find((side) => side.text === sideText);
      if (selectedSide) {
        total += selectedSide.price;
      }
    });

    selectedDrinks.forEach((drinkText) => {
      const selectedDrink = productDetails?.drinks.find((drink) => drink.text === drinkText);
      if (selectedDrink) {
        total += selectedDrink.price;
      }
    });

    selectedExtraOptions.forEach((optionText) => {
      const selectedOption = productDetails?.extraOptions.find((option) => option.text === optionText);
      if (selectedOption) {
        total += selectedOption.price;
      }
    });

    return total * quantity;
  };

  const handleAddToCart = () => {
    // Calculate the total price based on selected options
    const total = calculateTotalPrice();

    // Prepare the product object to add to the cart
    const productToAdd = {
      ...productDetails,
      selectedSize,
      selectedSides,
      selectedDrinks,
      selectedExtraOptions,
      quantity,
      total,
    };

    // Dispatch the action to add the product to the cart using Redux Toolkit
    dispatch(addProduct(productToAdd));
  };


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
  return (
    <section className='px-4 py-12'>
      <div className='max-w-screen-xl mx-auto'>
        <div className='' key={productDetails?.id}>
          <h2>Product Details</h2>
          <p>{productDetails?.title}</p>
          <p>{productDetails?.desc}</p>
          <p>Price: ${productDetails?.prices?.[0]}</p>

          <h3>Select Size:</h3>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

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
          <div className='flex gap-6 items-center'>
              <span onClick={() => addQuantity('dec')} className='bg-slate-300 px-4 py-2 text-[18px]'>-</span>
              <span>{quantity}</span>
              <span onClick={() => addQuantity('inc')} className='bg-slate-300 px-4 py-2 text-[18px]'>+</span>
          </div>

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
