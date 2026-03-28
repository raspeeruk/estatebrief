import { clsx } from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'teal'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full',
        {
          'bg-[#E2E1DE] text-[#6B7280]': variant === 'default',
          'bg-emerald-50 text-emerald-700': variant === 'success',
          'bg-amber-50 text-amber-700': variant === 'warning',
          'bg-red-50 text-red-700': variant === 'danger',
          'bg-[#0D7377]/10 text-[#0D7377]': variant === 'teal',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
