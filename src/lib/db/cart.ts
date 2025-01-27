import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'
import { cookies } from 'next/headers'

type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } }
}>
export type CartItemWithProduct = Prisma.CartItemGetPayload<{ include: { product: true } }>
export type ShoppingCart = { size: number; subtotal: number } & CartWithProducts

export const createCart = async (): Promise<ShoppingCart> => {
  const newCart = await prisma.cart.create({ data: {} })

  const cookieStore = await cookies()

  cookieStore.set('cartId', newCart.id, { httpOnly: true, sameSite: 'strict', secure: true })

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  }
}

export const getCart = async (): Promise<ShoppingCart | null> => {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cartId')?.value
  const cart = cartId
    ? await prisma.cart.findUnique({
        include: { items: { include: { product: true } } },
        where: { id: cartId },
      })
    : null

  if (!cart) {
    return null
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
  }
}
