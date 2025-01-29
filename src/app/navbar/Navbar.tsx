import { SearchForm } from '@/app/navbar/SearchForm'
import { ShoppingCartButton } from '@/app/navbar/ShoppingCartButton'
import { UserMenuButton } from '@/app/navbar/UserMenuButton'
import logo from '@/assets/logo.png'
import { authOptions } from '@/auth-options'
import { getCart } from '@/lib/db/cart'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

export const Navbar = async () => {
  const cart = await getCart()
  const session = await getServerSession(authOptions)

  return (
    <div className={'navbar flex flex-wrap justify-center bg-base-100'}>
      <div className={'flex-1'}>
        <Link className={'btn btn-ghost text-xl'} href={'/'}>
          <Image alt={'ecommerce logo'} height={40} src={logo} width={40} />
          <span className={'hidden sm:inline'}>EcommercE</span>
        </Link>
      </div>
      <SearchForm />
      <div className={'gap-3.5'}>
        <ShoppingCartButton cart={cart} />
        <UserMenuButton session={session} />
      </div>
    </div>
  )
}
