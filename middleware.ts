import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {SignJWT, jwtVerify, type JWTPayload} from 'jose';

export async function middleware(request: NextRequest) {  
  const accessToken = request.cookies.get('access-token');
  const refreshToken = request.cookies.get('refresh-token');
  
  console.log({request})
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.APP_SECRET));
    return NextResponse.next();
  } catch (error) {
    console.log('session terminated')
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ['/notification'],
}