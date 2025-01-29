import { FormSubmitButton } from '@/components/FormSubmitButton'
import { SearchFormReset } from '@/components/SeachFormReset'
import Form from 'next/form'

type Props = {
  query?: string
}

export const SearchForm = ({ query }: Props) => {
  return (
    <Form action={'/'} className={'search-form order-last max-w-80 sm:w-full'} scroll={false}>
      <label className={'input input-bordered flex w-full items-center gap-2'}>
        <input
          className={'grow'}
          defaultValue={query}
          name={'query'}
          placeholder={'Search'}
          type={'text'}
        />
        <div className={'flex items-center gap-2'}>
          <SearchFormReset />
          <FormSubmitButton className={'btn-sm rounded-full'}>
            <svg
              viewBox={'0 0 50 50'}
              width={20}
              x={'0px'}
              xmlns={'http://www.w3.org/2000/svg'}
              y={'0px'}
            >
              <path
                d={
                  'M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z'
                }
              ></path>
            </svg>
          </FormSubmitButton>
        </div>
      </label>
    </Form>
  )
}
