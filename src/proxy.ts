import { NextResponse, NextRequest } from 'next/server'
import { getDataFromToken } from './helpers/getDataFromToken'
import jwt from 'jsonwebtoken'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)

    if (path === '/profile' && token) {
        return NextResponse.redirect(new URL(`/profile/${decodedToken.id}`, request.nextUrl))
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/login',
        '/profile',
        '/signup',
        '/verifyemail',
        '/games/creategame'
    ],
}
