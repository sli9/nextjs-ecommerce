import { prisma } from '@/app/lib/db/prisma'
import { redirect } from 'next/navigation'
import {FormSubmitButton} from "@/components/FormSubmitButton";

export const metadata = {
  title: 'Add Product | EcE',
}

const addProduct = async (formData: FormData) => {
  'use server'
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const imgUrl = formData.get('imageUrl')?.toString()
  const price = Number(formData.get('price') || 0)

  if (!name || !description || !imgUrl || !price) {
    throw new Error('All fields are required')
  }

  await prisma.product.create({
    data: { name, description, imgUrl, price },
  })

  redirect('/')
}

export default function AddProduct() {
  return (
    <div>
      <h1 className={'mb-3 text-lg'}>Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name={'name'}
          placeholder={'Type a product name'}
          className={'input input-bordered input-primary mb-3 w-full'}
        />
        <textarea
          required
          name={'description'}
          placeholder={'Describe your product'}
          className={'textarea textarea-bordered textarea-primary mb-3 w-full'}
        />
        <input
          required
          name={'imageUrl'}
          type={'url'}
          placeholder={'Provide an image url'}
          className={'input input-bordered input-primary mb-3 w-full'}
        />
        <input
          required
          name={'price'}
          type={'number'}
          placeholder={'Type a price'}
          className={'input input-bordered input-primary mb-3 w-full'}
        />
        <FormSubmitButton>
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  )
}
