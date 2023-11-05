

'use client'

import Link from 'next/link'
import React from 'react'

const ProductCard = ({product: {title, _id, desc}}) => {
  return (
    <Link
    href={`/product/${_id}`}
    >
    <div key={_id} className=''>
    <p>{title}</p>
    </div>
    </Link>
  )
}

export default ProductCard