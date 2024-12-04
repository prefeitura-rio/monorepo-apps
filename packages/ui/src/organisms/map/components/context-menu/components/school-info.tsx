import type { PickingInfo } from '@deck.gl/core'
import { cn } from '@ed-rio/lib/utils'
import type { School } from '@ed-rio/types/models/school'
import { Separator } from '@ed-rio/ui/molecules/separator'
import { Calendar, MapPin } from 'lucide-react'

export const Label = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => <span className={cn('text-sm font-semibold', className)}>{children}</span>

export const Value = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => (
  <span
    className={cn('text-sm font-semibold text-muted-foreground', className)}
  >
    {children}
  </span>
)

export function SchoolInfo({
  pickingInfo,
}: {
  pickingInfo: PickingInfo<School>
}) {
  return (
    <div className="h-full w-full">
      <h4>Escola Municipal</h4>
      <Separator className="mb-4 mt-1 bg-secondary" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <MapPin className="shinrk-0 size-3.5" />
            <Label>Nome</Label>
          </div>
          <Value>{pickingInfo.object?.denominacao}</Value>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Calendar className="shinrk-0 size-3.5" />
            <Label>Tipo</Label>
          </div>
          <Value>{pickingInfo.object?.tipo}</Value>
        </div>
      </div>
    </div>
  )
}
