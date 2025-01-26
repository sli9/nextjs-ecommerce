'use server'

import { createCart, getCart } from '@/lib/db/cart'
import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'

export const incrementCartItemsQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart())

  const cartItemInCart = cart.items.find(item => item.product.id === productId)

  if (cartItemInCart) {
    await prisma.cartItem.update({
      data: { quantity: { increment: 1 } },
      where: { id: cartItemInCart.id },
    })
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity: 1 } })
  }
  revalidatePath('/products/[id]')
}
