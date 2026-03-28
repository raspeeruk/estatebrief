import { clsx } from 'clsx'

export interface Step {
  id: string
  label: string
  description?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string
  completedSteps: string[]
}

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <nav className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = completedSteps.includes(step.id)
        const isPast = isCompleted || steps.findIndex(s => s.id === currentStep) > index

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div
                className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
                  {
                    'bg-[#7C5C3A] text-white': isActive,
                    'bg-[#7C5C3A]/20 text-[#7C5C3A]': isCompleted,
                    'bg-[#DDD4C5] text-[#7A6A5A]': !isActive && !isCompleted,
                  }
                )}
              >
                {isCompleted ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={clsx(
                  'font-[family-name:var(--font-heading)] text-sm tracking-wide',
                  {
                    'text-[#7C5C3A] font-semibold': isActive,
                    'text-[#3D2B1F]': isCompleted,
                    'text-[#7A6A5A]': !isActive && !isCompleted,
                  }
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  'w-12 h-px mx-3',
                  isPast ? 'bg-[#7C5C3A]/30' : 'bg-[#DDD4C5]'
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
