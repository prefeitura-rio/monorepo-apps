'use client'

/* eslint-disable @next/next/no-img-element */
import '@/utils/string-extensions'

import { cn } from '@ed-rio/lib/utils'
import { Fullscreen, X } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CameraCOR } from '@/models/entities'

interface CameraSelectCardProps {
  selectedObject: CameraCOR | null
  setSelectedObject: (value: CameraCOR | null) => void
}

export function CameraSelectCard({
  selectedObject,
  setSelectedObject,
}: CameraSelectCardProps) {
  return (
    <Card
      className={cn(
        'absolute left-2 top-2 w-72 tracking-tighter',
        !selectedObject ? 'hidden' : '',
      )}
    >
      <div className="relative">
        <Button
          variant="outline"
          className="absolute right-1 top-1 h-5 w-5 p-0"
          onClick={() => {
            setSelectedObject(null)
          }}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-md text-center tracking-tighter">
            Câmera{' '}
            <span className="font-extrabold text-primary">
              {selectedObject?.code}
            </span>
          </CardTitle>
          <CardDescription className="text-xs">{`${selectedObject?.location.capitalizeFirstLetter()} - ${selectedObject?.zone.capitalizeFirstLetter()}`}</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="relative w-full">
            <video>
              <source src="http://104.154.236.138:8888/rtsp_c000002/" />
            </video>
            <img
              src={'http://104.154.236.138:8888/rtsp_c000002/'}
              alt="Streaming"
              className="aspect-video w-full bg-border"
            />
            <Button
              variant="ghost"
              asChild
              className="absolute bottom-1 right-1 h-6 p-1"
            >
              <Link
                href={'http://104.154.236.138:8888/rtsp_c000002/'}
                className="text-xs text-muted-foreground"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  window.open(
                    'http://104.154.236.138:8888/rtsp_c000002/',
                    '_blank',
                  )
                }}
              >
                <Fullscreen className="h-4 w-4 text-primary" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
