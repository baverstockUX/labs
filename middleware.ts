import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-me'
)

export async function middleware(request: NextRequest) {
  // Skip authentication in development mode
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  const token = request.cookies.get('site-access')?.value

  // Check if we are on the login page
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET)
        // If valid token, redirect to home
        return NextResponse.redirect(new URL('/', request.url))
      } catch (error) {
        // Token invalid, allow access to login page
      }
    }
    return NextResponse.next()
  }

  // Check for authenticated token for all other pages
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    // Token invalid
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public images with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
