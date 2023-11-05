'use client'

import React from 'react'
import axios from 'axios'
import { useCartContext } from '@/lib/cartContext'
import { AiOutlineClose } from 'react-icons/ai'


const Cart = () => {
    const {cartItems, removeCartItem} = useCartContext()

  return (
    <section className='min-w-[275px] h-full px-3 py-6 bg-white text-[#333] rounded-lg shadow-lg cursor-pointer'>
        <div>
            <p>Cart Items</p>
            <div className="max-h-[225px] overflow-auto flex flex-col gap-8 my-8">
            {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <div key={item._id} className='flex items-center gap-8'>
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.quantity} X ${item.price}</span>
                </div>
                <AiOutlineClose size={20} onClick={() => removeCartItem(item)}/>
              </div>
            ))
          ) : <span className="text-red-500 ml-2">Cart is empty!</span>}
        </div>
        </div>
    </section>
  )
}

export default Cart