import React, { SetStateAction } from 'react'
import { FaSearch } from 'react-icons/fa'

interface SearchBarButtonProps {
  placeholder: string
  list: string[]
  setList: React.Dispatch<SetStateAction<string[]>>
  action: () => void
}

const SearchBarButton: React.FC<SearchBarButtonProps> = ({
  placeholder,
  list,
  setList,
  action,
}) => {
  const filterList = (search: string) => {
    const newList = list.filter((el) => {
      return el.toLowerCase().includes(search.toLowerCase())
    })
    setList(newList)
  }

  return (
    <div className='mx-auto mt-5 flex w-11/12 max-w-[450px] flex-col gap-x-5 gap-y-5 lg:ml-0 lg:max-w-[900px] lg:flex-row'>
      <div className='flex w-full items-center justify-around rounded-full bg-input-green px-2 py-1 lg:w-4/5'>
        <input
          onChange={(e) => {
            filterList(e.target.value)
          }}
          type='text'
          placeholder={placeholder}
          className='w-4/5 rounded-full bg-input-green px-5 py-3 text-white focus:outline-none lg:py-4'
        />
        <FaSearch color='white' className='mr-3 h-7 w-7' />
      </div>
      <button
        onClick={() => {
          action()
        }}
        className='z-10 w-full rounded-full bg-button-blue px-6 py-4 font-bold text-white hover:bg-mid-blue lg:w-1/5'
      >
        Continuar
      </button>
    </div>
  )
}

export default SearchBarButton
