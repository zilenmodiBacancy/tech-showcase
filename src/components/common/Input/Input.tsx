import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'

export const InputVariant = {
  Primary:
    'bg-card text-foreground block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset ring-muted-ring placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6' as const,
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  name?: string
  label?: string
  error?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
}

export const Input: FC<InputProps> = ({
  register,
  name,
  label,
  id,
  error = '',
  type = 'text',
  placeholder,
  className = '',
  ...props
}) => {
  const inputProps = {
    type,
    id,
    placeholder,
    className: classNames(InputVariant.Primary, className),
    ...(register ? { ...register(name as string) } : {}),
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
          {props.required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}
      <div className="mt-1">
        <input {...inputProps} />
        {error && <div className="h-6 text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  )
}
