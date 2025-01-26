import { ShoppingCartButton } from '@/app/(navbar)/ShoppingCartButton'
import logo from '@/assets/logo.png'
import { getCart } from '@/lib/db/cart'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const searchProducts = async (formData: FormData) => {
  'use server'

  const searchQuery = formData.get('searchQuery')?.toString()

  if (!searchQuery) {
    redirect('/search?query=' + searchQuery)
  }
}

export const Navbar = async () => {
  const cart = await getCart()

  return (
    <div className={'navbar bg-base-100'}>
      <div className={'flex-1'}>
        <Link className={'btn btn-ghost text-xl'} href={'/'}>
          <Image alt={'ecommerce logo'} height={40} src={logo} width={40} />
          EcommercE
        </Link>
      </div>
      <div className={'flex-none gap-3.5'}>
        <form action={searchProducts}>
          <div className={'form-control'}>
            <input
              className={'input input-bordered w-full min-w-80'}
              name={'searchQuery'}
              placeholder={'Search'}
              type={'text'}
            />
          </div>
        </form>
        <ShoppingCartButton cart={cart} />
      </div>
    </div>
  )
}
