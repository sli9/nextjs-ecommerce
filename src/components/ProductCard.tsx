import { PriceLabel } from '@/components/PriceLabel'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

  return (
    <Link
      className={'card w-full bg-base-100 transition-shadow hover:shadow-xl'}
      href={'/products/' + product.id}
    >
      <div className={'card card-compact bg-base-100'}>
        <figure>
          {/* height and width indicate the size of the image, that Next.js will resize on server side. */}
          <Image
            alt={product.name}
            className={'h-48 object-cover'}
            height={400}
            src={product.imgUrl}
            width={800}
          />
        </figure>
        <div className={'card-body'}>
          <h2 className={'card-title'}>{product.name}</h2>
          {isNew && <div className={'badge badge-secondary'}>NEW</div>}
          <p>{product.description}</p>
          <PriceLabel price={product.price} />
        </div>
      </div>
    </Link>
  )
}
