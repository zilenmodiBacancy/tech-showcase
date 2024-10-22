import React, { FC, forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'

interface DropdownProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  register?: UseFormRegister<any>
  name?: string
  label?: string
  id?: string
  error?: string
  value?: string
  placeholder?: string
  onChangeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  list?: {
    id?: string
    name?: string
  }[]
  inputClassName?: string
  defaultValue?: string
  required?: boolean
}

const Dropdown: FC<DropdownProps> = forwardRef<
  HTMLSelectElement,
  DropdownProps
>(
  ({
    register,
    name,
    label,
    id,
    error,
    value,
    onChangeHandler,
    inputClassName,
    list,
    defaultValue,
    required,
    ...props
  }) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-foreground"
        >
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}
      <div className="mt-1">
        <select
          id={id}
          defaultValue={defaultValue}
          className={classNames(
            'bg-card block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-muted-ring focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6',
            inputClassName!
          )}
          {...props}
          {...(register
            ? register(name as string)
            : { value, onChange: onChangeHandler })}
        >
          {list?.map((listItem) => (
            <option key={listItem?.id} value={listItem?.id}>
              {listItem?.name}
            </option>
          ))}
        </select>
        {error && <div className="h-6 text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  )
)

export default Dropdown
