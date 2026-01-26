'use server'

import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-me'
)

export interface State {
  error?: string
}

export async function login(prevState: State, formData: FormData) {
  const password = formData.get('password')
  const sitePassword = process.env.SITE_PASSWORD

  // If no password is set in env, we might want to block access or allow all. 
  // For security, blocking is better, but maybe prompt user to set it.
  // Assuming user will set it.
  
  if (password !== sitePassword) {
    // Delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { error: 'Invalid password' }
  }

  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  
  cookieStore.set('site-access', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })

  redirect('/')
}
