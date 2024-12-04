'use server'

import { Layout } from '@ed-rio/ui/modules/vision-ai/layout'
import type { ReactNode } from 'react'

import { env } from '@/env'

export default async function VisionAILayout({
  children,
}: {
  children: ReactNode
}) {
  return <Layout mapboxAccessToken={env.MAPBOX_ACCESS_TOKEN}>{children}</Layout>
}
