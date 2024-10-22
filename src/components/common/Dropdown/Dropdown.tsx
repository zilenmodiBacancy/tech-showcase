import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'

export const DropdownVariant = {
  Primary:
    'bg-card text-foreground block w-full rounded-md border-0 py-2 px-2.5 shadow-sm ring-1 ring-inset ring-muted-ring focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6' as const,
}

interface DropdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  name: string
  label?: string
  id?: string
  error?: string
  value?: string
  onChangeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  list?: {
    id: string
    name: string
  }[]
  inputClassName?: string
  defaultValue?: string
  required?: boolean
}

const Dropdown: FC<DropdownProps> = ({
  register,
  name,
  label,
  id,
  error = '',
  defaultValue,
  list,
  required,
  onChangeHandler,
  inputClassName = '',
  ...props
}) => {
  const selectProps = {
    id,
    name,
    defaultValue,
    className: classNames(DropdownVariant.Primary, inputClassName),
    onChange: onChangeHandler,
    ...(register ? { ...register(name) } : {}),
    ...props,
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-foreground block text-sm font-medium leading-6"
        >
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}
      <div className="mt-1">
        <select {...selectProps}>
          {list?.map((listItem) => (
            <option key={listItem.id} value={listItem.id}>
              {listItem.name}
            </option>
          ))}
        </select>
        {error && <div className="h-6 text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  )
}

export default Dropdown
