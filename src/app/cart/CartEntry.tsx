'use client'

import { ChangeEvent, useTransition } from 'react'

import { setProductQuantity } from '@/app/cart/actions'
import { CartItemWithProduct } from '@/lib/db/cart'
import { formatPrice } from '@/lib/formatPrice'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  cartItem: CartItemWithProduct
}

export const CartEntry = ({ cartItem: { product, quantity } }: Props) => {
  const [isPending, startTransition] = useTransition()

  const quantityOptions = Array.from({ length: 99 }, (_, i) => i + 1).map(i => (
    <option disabled={i === quantity} key={i} value={i}>
      {i}
    </option>
  ))

  const changeQuantityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = Number(e.target.value)

    startTransition(async () => {
      await setProductQuantity(product.id, newQuantity)
    })
  }

  return (
    <div>
      <div className={'flex flex-wrap items-center gap-4 rounded-lg'}>
        <Image
          alt={product.name}
          className={'h-64 rounded-lg object-cover'}
          height={300}
          src={product.imgUrl}
          width={300}
        />
        <div>
          <Link className={'text-2xl font-bold'} href={'/products/' + product.id}>
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className={'my-1 flex items-center gap-2'}>
            Quantity:{' '}
            <select
              className={'select select-bordered select-sm w-full max-w-[80px]'}
              defaultValue={quantity}
              onChange={changeQuantityHandler}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div>
            Total: {formatPrice(product.price * quantity)}
            {isPending && <span className={'loading loading-ball loading-sm'} />}
          </div>
        </div>
      </div>
      <div className={'divider'} />
    </div>
  )
}
