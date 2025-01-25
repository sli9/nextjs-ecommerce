import { ProductCard } from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  })

  return (
    <div>
      <div
        className={'hero'}
        style={{
          backgroundImage: `url(${products[0].imgUrl})`,
        }}
      >
        <div className={'hero-overlay bg-opacity-60'}></div>
        <div className={'hero-content text-center text-neutral-content'}>
          <div className={'max-w-md'}>
            <h1 className={'mb-5 text-5xl font-bold'}>{products[0].name}</h1>
            <p className={'mb-5'}>{products[0].description}</p>
            <Link className={'btn btn-primary'} href={'/products/' + products[0].id}>
              Check it out
            </Link>
          </div>
        </div>
      </div>
      <div className={'my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'}>
        {products.slice(1).map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
