'use client'

import { cn } from '@ed-rio/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'
import { TimePicker } from './time-picker'

interface DatePickerProps {
  value: Date | undefined
  onChange: React.Dispatch<React.SetStateAction<Date | undefined>>
  type?: 'date' | 'datetime-local'
  className?: string
  fromDate?: Date
  toDate?: Date
  disabled?: boolean
}

export function DatePicker({
  value,
  onChange,
  className,
  type = 'date',
  fromDate,
  toDate,
  disabled = false,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          {value ? (
            format(value, 'dd MMM, y HH:mm')
          ) : (
            <span>Escolha uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          fromDate={fromDate}
          toDate={toDate}
          onSelect={(newDate) => {
            if (newDate && value) {
              const newValue = new Date(value)
              newValue.setDatePreservingTime(newDate)
              onChange(newValue)
            } else {
              onChange(newDate)
            }
          }}
          initialFocus
          disabled={disabled}
        />
        {type === 'datetime-local' && (
          <>
            <Separator orientation="horizontal" className="" />
            <div className="flex items-center justify-center gap-2">
              <TimePicker
                disableFuture
                value={value}
                defaultValue={value}
                onChange={onChange}
                disabled={!value}
              />
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
