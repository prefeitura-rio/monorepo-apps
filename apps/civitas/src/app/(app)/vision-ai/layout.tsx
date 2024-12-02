'use server'

import { Layout } from '@ed-rio/ui/modules/vision-ai/layout'
import type { ReactNode } from 'react'

import { config } from '@/config'

export default async function VisionAILayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Layout mapboxAccessToken={config.mapboxAccessToken}>{children}</Layout>
  )
}
