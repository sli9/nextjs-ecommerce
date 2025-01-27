'use client'
import profilePicHolder from '@/assets/profile-pic-placeholder.png'
import Image from 'next/image'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

type Props = {
  session: Session | null
}

export const UserMenuButton = ({ session }: Props) => {
  const user = session?.user

  return (
    <div className={'dropdown dropdown-end'}>
      <label className={'avatar btn btn-circle btn-ghost'} tabIndex={0}>
        {user ? (
          <Image
            alt={'profile picture'}
            className={'w-10 rounded-full'}
            height={40}
            src={user?.image || profilePicHolder}
            width={40}
          />
        ) : (
          <svg
            className={'inline-block h-5 w-5 stroke-current'}
            fill={'none'}
            viewBox={'0 0 24 24'}
            xmlns={'http://www.w3.org/2000/svg'}
          >
            <path
              d={
                'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
              }
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              strokeWidth={'2'}
            />
          </svg>
        )}
      </label>
      <ul
        className={'menu dropdown-content menu-sm z-30 w-52 rounded-box bg-base-100 p-2 shadow'}
        tabIndex={0}
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: '/' })} type={'button'}>
              Sign out
            </button>
          ) : (
            <button onClick={() => signIn()} type={'button'}>
              Sign in
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}
