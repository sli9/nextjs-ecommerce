export const formatPrice = (price: number) =>
  //price stored in cents in the database
  (price / 100).toLocaleString('en-US', { currency: 'USD', style: 'currency' })
