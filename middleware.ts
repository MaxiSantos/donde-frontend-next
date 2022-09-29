import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {jwtVerify, type JWTPayload} from 'jose';
import { validateAccessToken, validateRefreshToken } from 'app/common/lib/auth';

export async function middleware(request: NextRequest) {  
  const accessToken = request.cookies.get('access-token');
  const refreshToken = request.cookies.get('refresh-token');
  
  console.log('veryfing tokens')
  if (!accessToken || !refreshToken) {
    // * we need to send query params to /login so that authorizationProvider knows this is adifferent login page and therefore it allows to get to that page. In that page we then logout and remove query params.
    return NextResponse.redirect(new URL("/login?action=logout", request.url));
  }
  
  try {
    const decodedAccessToken = await validateAccessToken(accessToken);
    if(decodedAccessToken){
      console.log('access token valid')
      return NextResponse.next();
    }
    
    console.log('about to validate refresh token')
    const decodedRefreshToken = await validateRefreshToken(refreshToken);
    if(decodedRefreshToken){
      console.log('refresh token valid, requesting new ones')
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/refresh-token`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'refresh-token': refreshToken
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const cookies = response.headers.get('set-cookie')
        console.log({cookies})
        console.log('new tokens received ok')
        // updating cookies
        // https://github.com/vercel/next.js/issues/36049#issuecomment-1122077832
        const redirectResponse = NextResponse.redirect(request.url);
        redirectResponse.headers.set('Set-Cookie', cookies);
        return redirectResponse;        
        //return NextResponse.next();        
      } else {
        console.log('new tokens not received')
        return NextResponse.redirect(new URL("/login?action=logout", request.url));
      }
    }
    console.log('tokens expired or invalids')
    return NextResponse.redirect(new URL("/login?action=logout", request.url));
  } catch (error) {
    console.log('session terminated')
    
    return NextResponse.redirect(new URL("/login?action=logout", request.url));
  }
}

export const config = {
  matcher: ['/query', '/profile'],
}