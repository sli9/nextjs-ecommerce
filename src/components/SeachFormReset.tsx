'use client'

import Link from 'next/link'

export const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement

    if (form) {
      form.reset()
    }
  }

  return (
    <button onClick={reset} type={'reset'}>
      <Link className={'kbd kbd-sm'} href={'/'}>
        X
      </Link>
    </button>
  )
}
