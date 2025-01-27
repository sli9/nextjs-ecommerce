import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db/prisma'
import { Cart, CartItem, Prisma } from '@prisma/client'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'

type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } }
}>
export type CartItemWithProduct = Prisma.CartItemGetPayload<{ include: { product: true } }>
export type ShoppingCart = { size: number; subtotal: number } & CartWithProducts

export const createCart = async (): Promise<ShoppingCart> => {
  const session = await getServerSession(authOptions)
  let newCart: Cart

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    })
  } else {
    newCart = await prisma.cart.create({
      data: {},
    })
    const cookieStore = await cookies()

    cookieStore.set('cartId', newCart.id, { httpOnly: true, sameSite: 'strict', secure: true })
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  }
}

export const getCart = async (): Promise<ShoppingCart | null> => {
  const session = await getServerSession(authOptions)

  let cart: CartWithProducts | null = null

  if (session) {
    cart = await prisma.cart.findFirst({
      include: { items: { include: { product: true } } },
      where: { userId: session.user.id },
    })
  } else {
    const cookieStore = await cookies()
    const cartId = cookieStore.get('cartId')?.value

    cart = cartId
      ? await prisma.cart.findUnique({
          include: { items: { include: { product: true } } },
          where: { id: cartId },
        })
      : null
  }

  if (!cart) {
    return null
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
  }
}

export const mergeAnonymousCartIntoUserCart = async (userId: string) => {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cartId')?.value

  const notLoggedInUserCart = cartId
    ? await prisma.cart.findUnique({
        include: { items: true },
        where: { id: cartId },
      })
    : null

  if (!notLoggedInUserCart) {
    return
  }

  const userCart = await prisma.cart.findFirst({
    include: { items: true },
    where: { userId },
  })

  await prisma.$transaction(async tx => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(notLoggedInUserCart.items, userCart.items)

      await tx.cartItem.deleteMany({ where: { cartId: userCart.id } })

      await tx.cartItem.createMany({
        data: mergedCartItems.map(item => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      })
    } else {
      await tx.cart.create({
        data: {
          items: {
            createMany: {
              data: notLoggedInUserCart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          userId,
        },
      })
    }

    await tx.cart.delete({
      where: { id: notLoggedInUserCart.id },
    })

    cookieStore.set('cartId', '')
  })
}
// CartItem[][]: first []  indicates that it's an array of CartItem objects, second [] indicates that it's an array of those arrays
const mergeCartItems = (...cartItems: CartItem[][]) => {
  return cartItems.reduce((acc, items) => {
    items.forEach(item => {
      const existingItem = acc.find(i => i.productId === item.productId)

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        acc.push(item)
      }
    })

    return acc
  }, [] as CartItem[])
}
