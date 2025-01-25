import { cache } from 'react'

import { PriceLabel } from '@/components/PriceLabel'
import { prisma } from '@/lib/db/prisma'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    notFound()
  }

  return product
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  return {
    description: product.description,
    openGraph: {
      images: [{ url: product.imgUrl }],
    },
    title: product.name + ' | EcE',
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProduct(id)

  return (
    <div className={'flex flex-col items-center gap-4 lg:flex-row'}>
      <Image
        alt={product.name}
        className={'rounded-lg object-cover'}
        height={500}
        priority
        src={product.imgUrl}
        width={500}
      />
      <div>
        <h1 className={'text-3xl font-bold'}>{product.name}</h1>
        <PriceLabel className={'mt-4'} price={product.price} />
        <p className={'py-6'}>{product.description}</p>
      </div>
    </div>
  )
}
