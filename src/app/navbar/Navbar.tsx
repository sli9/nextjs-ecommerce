import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { SearchForm } from '@/app/navbar/SearchForm'
import { ShoppingCartButton } from '@/app/navbar/ShoppingCartButton'
import { UserMenuButton } from '@/app/navbar/UserMenuButton'
import logo from '@/assets/logo.png'
import { getCart } from '@/lib/db/cart'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

export const Navbar = async () => {
  const cart = await getCart()
  const session = await getServerSession(authOptions)

  return (
    <div className={'navbar bg-base-100'}>
      <div className={'flex-1'}>
        <Link className={'btn btn-ghost text-xl'} href={'/'}>
          <Image alt={'ecommerce logo'} height={40} src={logo} width={40} />
          EcommercE
        </Link>
      </div>
      <div className={'flex-none gap-3.5'}>
        <SearchForm />
        <ShoppingCartButton cart={cart} />
        <UserMenuButton session={session} />
      </div>
    </div>
  )
}
