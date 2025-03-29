import { cookies } from 'next/headers'
import { kv } from './kv'

const SESSION_KEY = 'session'

export async function getSession() {
  const cookie = cookies().get(SESSION_KEY)?.value
  if (!cookie) return null

  const session = await kv.get(`session:${cookie}`)
  return session ? JSON.parse(session) : null
}

export async function createSession(user: { email: string }) {
  const token = crypto.randomUUID()

  await kv.put(`session:${token}`, JSON.stringify(user), {
    expirationTtl: 60 * 60 * 24
  })

  return token
}

export async function destroySession(token: string) {
  await kv.delete(`session:${token}`)
}
