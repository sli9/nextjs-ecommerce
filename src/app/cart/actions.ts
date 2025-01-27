'use server'

import { getCart } from '@/lib/db/cart'
import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'

export const setProductQuantity = async (productId: string, quantity: number) => {
  const cart = await getCart()

  const cartItemInCart = cart?.items.find(item => item.product.id === productId)

  if (quantity === 0) {
    if (cartItemInCart) {
      await prisma.cartItem.delete({ where: { id: cartItemInCart.id } })
    }
  } else {
    if (cartItemInCart) {
      await prisma.cartItem.update({
        data: { quantity },
        where: { id: cartItemInCart.id },
      })
    }
  }

  revalidatePath('/cart')
}
