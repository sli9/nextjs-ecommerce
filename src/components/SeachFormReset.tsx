'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const SearchFormReset = () => {
  const query = useSearchParams()?.get('query')
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement

    if (form) {
      form.reset()
    }
  }

  return (
    <button className={`${query ? '' : 'hidden'}`} onClick={reset} type={'reset'}>
      <Link className={'kbd kbd-sm'} href={'/'}>
        X
      </Link>
    </button>
  )
}
