import { Loader2 } from 'lucide-react'

import { cn } from '@ed-rio/lib/utils'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <Loader2
      className={cn('size-4 animate-spin text-muted-foreground', className)}
    />
  )
}
