import { VisionAIMapContextProvider } from '@ed-rio/contexts/vision-ai-map-context'
import { QueryClientProviderWrapper } from '@ed-rio/lib/query-client-provider-wrapper'
import { TooltipProvider } from '@ed-rio/ui/molecules/tooltip'

import Map from './components/map'

export function Layout({
  mapboxAccessToken,
  children,
}: Readonly<{
  mapboxAccessToken: string
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen w-full flex">
      <QueryClientProviderWrapper>
        <TooltipProvider>
          <VisionAIMapContextProvider>
            <Map mapboxAccessToken={mapboxAccessToken} />
            <div className="w-[480px] shrink-0 grow-0 h-full space-y-4">
              {children}
            </div>
          </VisionAIMapContextProvider>
        </TooltipProvider>
      </QueryClientProviderWrapper>
    </div>
  )
}
