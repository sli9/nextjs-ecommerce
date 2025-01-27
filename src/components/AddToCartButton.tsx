'use client'

import { useState, useTransition } from 'react'

import { incrementCartItemsQuantity } from '@/app/products/[id]/actions'
import { ShoppingCart } from '@/lib/db/cart'

type Props = {
  cart: ShoppingCart | null
  productId: string
}

export const AddToCartButton = ({ cart, productId }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<boolean>(false)

  const ProductInCart = cart?.items.find(item => item.product.id === productId)

  return (
    <div className={'flex items-center gap-2'}>
      <button
        className={'btn btn-primary'}
        disabled={isPending}
        onClick={() => {
          setSuccess(false)
          startTransition(async () => {
            await incrementCartItemsQuantity(productId)
            setSuccess(true)
          })
        }}
        type={'button'}
      >
        {ProductInCart ? (
          <span>
            In the cart <span className={'badge badge-warning'}>{ProductInCart.quantity}</span>
          </span>
        ) : (
          'Add to cart'
        )}
        <svg
          className={'h-5 w-5'}
          fill={'none'}
          stroke={'currentColor'}
          viewBox={'0 0 24 24'}
          xmlns={'http://www.w3.org/2000/svg'}
        >
          <path
            d={
              'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            }
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={'2'}
          />
        </svg>
      </button>
      {isPending && <span className={'loading loading-ball loading-md'} />}
      {!isPending && success && <span className={'text-success'}>Added to cart</span>}
    </div>
  )
}
