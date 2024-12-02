import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MonitoredPlatesContextProvider } from '@/contexts/monitored-plates-context'
import { CustomQueryClientProvider } from '@/hooks/query-client-provider'

import { Sidebar } from './components/sidebar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <CustomQueryClientProvider>
      <MonitoredPlatesContextProvider>
        <TooltipProvider delayDuration={200} skipDelayDuration={0}>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            {children}
          </div>
        </TooltipProvider>
      </MonitoredPlatesContextProvider>
    </CustomQueryClientProvider>
  )
}
