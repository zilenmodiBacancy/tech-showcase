import { XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, FC } from 'react'

import { Input, InputProps } from '@/components/common/Input'

interface DebouncedInputProps extends Omit<InputProps, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  showXButton?: boolean
}

const DebouncedInput: FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  showXButton = true,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return (
    <div className="w-full relative rounded-md shadow-sm">
      <Input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`py-1.5 pl-2.5 ${showXButton ? 'pr-10' : ''}`}
      />
      {showXButton && (
        <div className="absolute top-[7.5px] right-0 flex items-center pr-3">
          <XCircleIcon
            onClick={() => setValue('')}
            className="w-5 h-5 text-muted cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}

export default DebouncedInput
