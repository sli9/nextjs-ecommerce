'use client'
import { ShoppingCart } from '@/lib/db/cart'
import { formatPrice } from '@/lib/formatPrice'
import Link from 'next/link'

type Props = {
  cart: ShoppingCart | null
}

const closeDropdownHandler = () => {
  const activeElement = document.activeElement as HTMLElement

  activeElement?.blur()
}

export const ShoppingCartButton = ({ cart }: Props) => {
  return (
    <div className={'dropdown dropdown-end'}>
      <div className={'btn btn-circle btn-ghost'} role={'button'} tabIndex={0}>
        <div className={'indicator'}>
          <svg
            className={'h-7 w-7'}
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
          {cart && (
            <span className={'badge indicator-item badge-warning badge-sm'}>{cart?.size}</span>
          )}
        </div>
      </div>
      <div
        className={'card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow'}
        tabIndex={0}
      >
        <div className={'card-body'}>
          <span className={'text-lg font-bold'}>{cart?.size || 0}</span>
          <span className={'text-info'}>{formatPrice(cart?.subtotal || 0)}</span>
          <div className={'card-actions'}>
            <Link
              className={'btn btn-primary btn-block'}
              href={'/cart'}
              onClick={closeDropdownHandler}
              type={'button'}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
