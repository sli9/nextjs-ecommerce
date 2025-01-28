import { JSX } from 'react'

import Link from 'next/link'

type Props = {
  currentPage: number
  query: string
  totalPages: number
}

export const PaginationBar = ({ currentPage, query, totalPages }: Props) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10))
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))

  const numberedPageItems: JSX.Element[] = []

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        className={`btn join-item ${currentPage === page ? 'btn-active pointer-events-none' : ''}`}
        href={`?page=${page}&query=${query}`}
        key={page}
      >
        {page}
      </Link>
    )
  }

  return (
    <>
      <div className={'join hidden sm:block'}>{numberedPageItems}</div>
      <div className={'join block sm:hidden'}>
        {currentPage > 1 && (
          <Link className={'btn join-item'} href={'?page=' + (currentPage - 1)}>
            «
          </Link>
        )}
        <button className={'btn join-item pointer-events-none'} type={'button'}>
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link className={'btn join-item'} href={'?page=' + (currentPage - 1)}>
            »
          </Link>
        )}
      </div>
    </>
  )
}
