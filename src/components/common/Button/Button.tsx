import { classNames } from '@/helpers'

export enum ButtonVariant {
  Primary = '!bg-primary !text-primary-foreground',
  Secondary = '!mt-3 !inline-flex !justify-center !rounded-md !card !px-3 !py-2 !text-sm !font-semibold !text-foreground !shadow-sm !ring-1 !ring-inset !ring-muted-ring sm:!col-start-1 sm:!mt-0',
  Ternary = '!bg-transparent hover:!bg-primary !text-primary font-medium text-sm hover:!text-white border border-primary hover:!border-transparent',
  Transparent = '!bg-transparent',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
  buttonTestId?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  name,
  onClick,
  disabled = false,
  variant = ButtonVariant.Primary,
  children,
  buttonTestId,
  form,
  ...props
}) => (
  <button
    {...props}
    type={type}
    name={name}
    className={classNames(
      'rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
      variant,
      className
    )}
    disabled={disabled}
    onClick={onClick}
    data-testid={buttonTestId}
    form={form}
  >
    {children}
  </button>
)

export default Button
