import { CartEntry } from '@/app/cart/CartEntry'
import { getCart } from '@/lib/db/cart'
import { formatPrice } from '@/lib/formatPrice'

export const metadata = {
  title: 'Cart | EcE',
}

export default async function CartPage() {
  const cart = await getCart()

  return (
    <div>
      <h1 className={'mb-6 text-4xl font-bold'}>Shopping Cart</h1>
      {cart?.items.map(cartItem => <CartEntry cartItem={cartItem} key={cartItem.id} />)}
      {!cart?.items.length && 'Your cart is empty'}
      <div>
        <p className={'font-bold'}>Total: {formatPrice(cart?.subtotal || 0)}</p>
      </div>
    </div>
  )
}
