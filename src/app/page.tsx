import { Navbar } from '@/app/navbar/Navbar'
import { PaginationBar } from '@/components/PaginationBar'
import { ProductCard } from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ page?: string; query?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { page = '1', query = '' } = await searchParams
  const currentPage = Number(page)

  const pageSize = 6
  const heroItemCount = 1
  const totalItemsCount = await prisma.product.count({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  })

  const totalPages = Math.ceil((totalItemsCount - heroItemCount) / pageSize)

  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  })

  if (products.length === 0) {
    return (
      <div className={'flex h-full items-center justify-center text-4xl'}>Products not found</div>
    )
  }

  return (
    <>
      <Navbar query={query} />
      <div className={'flex flex-col items-center'}>
        {currentPage === 1 && (
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
        )}
        <div className={'my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'}>
          {(currentPage === 1 ? products.slice(1) : products).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} query={query} totalPages={totalPages} />
        )}
      </div>
    </>
  )
}
