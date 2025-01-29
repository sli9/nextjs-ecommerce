import type { NextAuthOptions } from 'next-auth'

import { mergeAnonymousCartIntoUserCart } from '@/lib/db/cart'
import { prisma } from '@/lib/db/prisma'
import { env } from '@/lib/env'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'
import Google from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id

      return session
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id)
    },
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthOptions
