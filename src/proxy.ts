import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    let decodedToken

    if (token !== '') {
        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)
        }
        catch (err: any) {
            if (err.message === 'jwt expired') {
                const response = await NextResponse.json({
                    message: "Logout Successful",
                    success: true
                })
                response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
            }
        }
    }

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
        '/games/creategame',
        '/reviews/newreview'
    ],
}
