import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-[#FAF6F0] border border-[#DDD4C5] rounded-[8px] shadow-[0_2px_6px_rgba(61,43,31,0.06)]',
        {
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('pb-4 border-b border-[#DDD4C5]', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={clsx('font-[family-name:var(--font-heading)] text-xl text-[#3D2B1F]', className)} {...props}>
      {children}
    </h3>
  )
}
