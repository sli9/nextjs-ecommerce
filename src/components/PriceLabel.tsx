import { formatPrice } from '@/lib/formatPrice'

type Props = {
  className?: string
  price: number
}

export const PriceLabel = ({ className, price }: Props) => {
  return <span className={`badge badge-primary ${className}`}>{formatPrice(price)}</span>
}
