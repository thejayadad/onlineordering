'use client'

import Link from 'next/link'
import React from 'react'
import { RiShoppingCart2Fill, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { useCartContext } from '@/lib/cartContext';
import Cart from '../Cart/Cart';

const Navbar = () => {
    const { isCartOpen, toggleCart, cartItems } = useCartContext()
  return (
    <header className='px-4 py-12'>
        <div className='max-w-screen-xl mx-auto flex justify-between'>
            <Link href={'/'}>Jaces</Link>
            <div className='flex relative'>                
            <RiShoppingCart2Fill onClick={toggleCart} className='h-6 w-6 text-gray-500' />
            <span className='absolute px-2 rounded-full bg-gray-300 text-[#222] top-[-20px]'>
            {cartItems?.length}
            </span>
            <div className="absolute z-10">
            {isCartOpen && <Cart />}
            </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar