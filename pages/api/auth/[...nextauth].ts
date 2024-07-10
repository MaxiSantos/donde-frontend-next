import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

import { callbacks } from 'app/common/lib/nextAuth/callbacks';
import { jwt } from 'app/common/lib/nextAuth/jwt';
import { logger } from 'app/common/lib/nextAuth/logger';
import { providers } from 'app/common/lib/nextAuth/providers';

type NextAuthOptionsType = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

const getNextAuthOptions: NextAuthOptionsType = (req, res) => {
  return {
    logger,
    debug: true,
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
    callbacks: callbacks(req, res),
    secret: process.env.NEXTAUTH_SECRET,
  }
}

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  logger,
  debug: true,
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
  secret: process.env.NEXTAUTH_SECRET,
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  /*
    we could modify/create cookies here
    https://next-auth.js.org/configuration/initialization
    https://github.com/nextauthjs/next-auth/discussions/4428#discussioncomment-5713221
  */
  /**
   * This is done in this way so we can access req and res from callbacks and other places so we can manage cookies by ourself
   */
  return await NextAuth(req, res, getNextAuthOptions(req, res))
}
