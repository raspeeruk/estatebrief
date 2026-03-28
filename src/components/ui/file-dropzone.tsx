'use client'

import { useCallback, useState, useRef } from 'react'
import { clsx } from 'clsx'

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSizeMB?: number
  disabled?: boolean
}

export function FileDropzone({ onFileSelect, accept = '.csv', maxSizeMB = 10, disabled }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    setError(null)

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB`)
      return
    }

    onFileSelect(file)
  }, [onFileSelect, maxSizeMB])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile, disabled])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleClick = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={clsx(
          'relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200',
          {
            'border-[#7C5C3A] bg-[#7C5C3A]/5': isDragging,
            'border-[#DDD4C5] hover:border-[#7C5C3A]/50 hover:bg-[#FAF6F0]': !isDragging && !disabled,
            'border-[#DDD4C5] opacity-50 cursor-not-allowed': disabled,
          }
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
        <div className="flex flex-col items-center gap-3">
          <div className={clsx(
            'w-12 h-12 rounded-full flex items-center justify-center',
            isDragging ? 'bg-[#7C5C3A]/10' : 'bg-[#DDD4C5]'
          )}>
            <svg className={clsx('w-6 h-6', isDragging ? 'text-[#7C5C3A]' : 'text-[#7A6A5A]')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-[#3D2B1F] font-medium">
              {isDragging ? 'Drop your CSV here' : 'Drag and drop your CSV file'}
            </p>
            <p className="text-sm text-[#7A6A5A] mt-1">
              or click to browse — up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#DC2626]">{error}</p>
      )}
    </div>
  )
}
