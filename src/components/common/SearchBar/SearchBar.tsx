import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { FC, useState, ChangeEvent } from 'react'

import { InputVariant } from '@/components/common/Input'

import { classNames } from '@/helpers'

interface SearchBarProps {
  placeholder?: string
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  inputClassName?: string
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onChangeHandler,
  inputClassName = '',
}) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onChangeHandler(e)
  }

  const handleClearClick = () => {
    const emptyEvent = {
      target: { value: '' },
    } as ChangeEvent<HTMLInputElement>
    setSearchValue('')
    onChangeHandler(emptyEvent)
  }

  return (
    <div className="w-full relative rounded-md shadow-sm">
      <div className="absolute top-[7.5px] left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-muted" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        value={searchValue}
        onChange={handleInputChange}
        className={classNames(
          InputVariant.Primary,
          'py-1.5 pl-10 pr-12',
          inputClassName
        )}
        placeholder={placeholder}
        aria-describedby="search-icon"
      />
      <div className="absolute top-[7.5px] right-0 flex items-center pr-3">
        <XCircleIcon
          onClick={handleClearClick}
          className="w-5 h-5 text-muted cursor-pointer"
        />
      </div>
    </div>
  )
}

export default SearchBar
