import { callbacks } from 'app/common/lib/nextAuth/callbacks';
import { jwt } from 'app/common/lib/nextAuth/jwt';
import { logger } from 'app/common/lib/nextAuth/logger';
import { providers } from 'app/common/lib/nextAuth/providers';
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  logger,
  session: {
    maxAge: 20,
    strategy: "jwt"
  },
  jwt,
  pages: {
    //signIn: '/login',
    newUser: '/auth/activate'
    /*signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)*/
  },
  providers,
  callbacks,
  secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)
