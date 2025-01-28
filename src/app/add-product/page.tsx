import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { FormSubmitButton } from '@/components/FormSubmitButton'
import { prisma } from '@/lib/db/prisma'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export const metadata = {
  title: 'Add Product | EcE',
}

const addProduct = async (formData: FormData) => {
  'use server'
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  }
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const imgUrl = formData.get('imageUrl')?.toString()
  const price = Number(formData.get('price') || 0)

  if (!name || !description || !imgUrl || !price) {
    throw new Error('All fields are required')
  }

  await prisma.product.create({
    data: { description, imgUrl, name, price },
  })

  redirect('/')
}

export default async function AddProduct() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/')
  }

  return (
    <div>
      <h1 className={'mb-3 text-lg'}>Add Product</h1>
      <form action={addProduct}>
        <input
          className={'input input-bordered input-primary mb-3 w-full'}
          name={'name'}
          placeholder={'Type a product name'}
          required
        />
        <textarea
          className={'textarea textarea-bordered textarea-primary mb-3 w-full'}
          name={'description'}
          placeholder={'Describe your product'}
          required
        />
        <input
          className={'input input-bordered input-primary mb-3 w-full'}
          name={'imageUrl'}
          placeholder={'Provide an image url'}
          required
          type={'url'}
        />
        <input
          className={'input input-bordered input-primary mb-3 w-full'}
          name={'price'}
          placeholder={'Type a price'}
          required
          type={'number'}
        />
        <FormSubmitButton>Add Product</FormSubmitButton>
      </form>
    </div>
  )
}
