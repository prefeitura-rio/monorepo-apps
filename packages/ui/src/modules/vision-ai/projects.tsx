'use client'

import { useProjects } from '@ed-rio/hooks/use-queries/use-projects'
import { Alert, AlertDescription, AlertTitle } from '@ed-rio/ui/molecules/alert'
import { Button } from '@ed-rio/ui/molecules/button'
import { Card } from '@ed-rio/ui/molecules/card'
import { ScrollArea } from '@ed-rio/ui/molecules/scroll-area'
import { Spinner } from '@ed-rio/ui/molecules/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ed-rio/ui/molecules/tooltip'
import { AlertCircle, Pencil, Plus } from 'lucide-react'
import Link from 'next/link'

import { ToastHandler } from '../../utils/toast-handler'

export function Projects() {
  const { data: projects, isPending, error } = useProjects()

  console.log({ error })

  return (
    <div className="relative w-full h-screen max-h-screen px-4 py-2 flex flex-col gap-4">
      <ToastHandler />
      <h3 className="text-2xl font-bold">Projetos</h3>
      <ScrollArea className="h-[calc(100%-3rem)]" type="hover">
        <div className="flex flex-col gap-2 h-full">
          {isPending && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Carregando...</span>
              <Spinner />
            </div>
          )}
          {!isPending && error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Não foi possível carregar os projetos. Por favor, tente
                novamente.
              </AlertDescription>
            </Alert>
          )}
          {projects?.map((project, index) => (
            <Card key={index} className="p-6 flex justify-between items-center">
              <div className="flex gap-1 flex-col">
                <span className="block">{project.name}</span>
                <span className="block">{project.model}</span>
                <div>
                  {project.enable ? (
                    <span className="bg-emerald-600 px-2 py-1 rounded-full">
                      Ativo
                    </span>
                  ) : (
                    <span className="bg-orange-600 px-2 py-1 rounded-full">
                      Inativo
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Button className="" variant="outline" size="icon" asChild>
                  <Link href={`/vision-ai/project/${project.id}`}>
                    <Pencil className="size-4 shrink-0" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <Tooltip>
        <TooltipTrigger>
          <Button
            className="absolute right-0 bottom-2"
            variant="secondary"
            size="icon"
            asChild
          >
            <Link href="/vision-ai/new-project">
              <Plus className="size-4 shrink-0" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Novo projeto</TooltipContent>
      </Tooltip>
    </div>
  )
}