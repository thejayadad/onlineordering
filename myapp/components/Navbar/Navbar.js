'use client'

import Link from 'next/link'
import React from 'react'
import { RiShoppingCart2Fill, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { useSelector } from "react-redux";


const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
  return (
    <header className='px-4 py-12'>
        <div className='max-w-screen-xl mx-auto flex justify-between'>
            <Link href={'/'}>Jaces</Link>
            <div className='flex relative'>
                <Link href={'/cart'}>                
            <RiShoppingCart2Fill  className='h-6 w-6 text-gray-500' />
            <span className='absolute px-2 rounded-full bg-gray-300 text-[#222] top-[-20px]'>
            {quantity}
            </span>
            </Link>
            <div className="absolute z-10">

            </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar