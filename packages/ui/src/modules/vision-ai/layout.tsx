import { VisionAIMapContextProvider } from '@ed-rio/contexts/vision-ai-map-context'
import { TooltipProvider } from '@ed-rio/ui/molecules/tooltip'

import { QueryClientProviderWrapper } from '../../utils/query-client-provider-wrapper'
import Map from './components/map'

export function Layout({
  mapboxAccessToken,
  children,
}: Readonly<{
  mapboxAccessToken: string
  children: React.ReactNode
}>) {
  return (
    <div className="h-full w-full flex">
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
