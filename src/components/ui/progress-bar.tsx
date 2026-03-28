import { clsx } from 'clsx'

interface ProgressBarProps {
  progress: number
  label?: string
  detail?: string
  className?: string
}

export function ProgressBar({ progress, label, detail, className }: ProgressBarProps) {
  return (
    <div className={clsx('w-full', className)}>
      {(label || detail) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-[#3D2B1F]">{label}</span>}
          {detail && <span className="text-sm text-[#7A6A5A]">{detail}</span>}
        </div>
      )}
      <div className="w-full h-1.5 bg-[#DDD4C5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7C5C3A] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}
