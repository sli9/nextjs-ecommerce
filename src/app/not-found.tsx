import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className={'text-center'}>
      <h1 className={'mb-4 text-6xl font-semibold text-error'}>404</h1>
      <p className={'mb-4 text-lg'}>Oops! Looks like you are lost.</p>
      <div className={'animate-bounce'}>
        <svg
          className={'mx-auto h-24 w-24 text-error'}
          fill={'none'}
          stroke={'currentColor'}
          viewBox={'0 0 24 24'}
        >
          <path
            d={'M12 19l9 2-9-18-9 18 9-2zm0 0v-8'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={'2'}
          ></path>
        </svg>
      </div>
      <p className={'mt-4'}>
        Let&#39;s get you back{' '}
        <Link className={'link-info'} href={'/'}>
          home
        </Link>
        .
      </p>
    </div>
  )
}
