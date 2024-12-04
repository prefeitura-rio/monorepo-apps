import { Button } from '@ed-rio/ui/molecules/button'
import Link from 'next/link'

export default async function App() {
  return (
    <div className="p-6 flex flex-col gap-3">
      <h1 className="font-bold text-4xl">Super APP 🦸</h1>
      <Button asChild className="w-40">
        <Link href={'/vision-ai'}>Vision AI</Link>
      </Button>
    </div>
  )
}
