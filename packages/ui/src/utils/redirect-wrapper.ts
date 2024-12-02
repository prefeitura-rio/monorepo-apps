import { redirect } from 'next/navigation'

export async function redirectWrapper(path: string) {
  redirect(path)
}
