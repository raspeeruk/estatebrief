import { clsx } from 'clsx'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5C3A] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#7C5C3A] text-[#FAF6F0] hover:bg-[#664B2E] active:bg-[#513A24]': variant === 'primary',
            'bg-[#FAF6F0] text-[#3D2B1F] border border-[#DDD4C5] hover:bg-[#F0EBE1] active:bg-[#E8DDD2]': variant === 'secondary',
            'text-[#7A6A5A] hover:text-[#3D2B1F] hover:bg-[#F0EBE1]': variant === 'ghost',
          },
          {
            'text-sm px-3 py-1.5 rounded-lg': size === 'sm',
            'text-sm px-5 py-2.5 rounded-lg': size === 'md',
            'text-base px-7 py-3.5 rounded-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
