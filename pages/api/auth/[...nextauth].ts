import type { NextAuthOptions } from "next-auth";
import type { JWT, JWTEncodeParams, JWTDecodeParams } from 'next-auth/jwt';

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const axios = require('axios').default;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },
  session:{
    maxAge: 2592000,
    strategy: "jwt"
  },
  /*jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
    encode: async (params: JWTEncodeParams): Promise<string> => {
      const { secret = process.env.NEXTAUTH_SECRET, token } = params;
      console.log({secret})
      let encodedToken = '';
      if (token) {
        const jwtClaims = {
          username: token.username,
          willExpire: token.willExpire,
          state: token.state,
        };

        encodedToken = jwt.sign(jwtClaims, secret, {
          expiresIn: parseInt(process.env.TOKEN_REFRESH_PERIOD),
          algorithm: 'HS512',
        });
      } else {
        console.log('TOKEN EMPTY. SO, LOGOUT!...');
        return '';
      }
      return encodedToken;
    },
    decode: async (params: JWTDecodeParams) => {
      const { token, secret } = params;
      const decoded = jwt.decode(token);

      return { ...(decoded as JWT) };
    },
  },*/
  /*session: {
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
    updateAge: 0,
    strategy: 'jwt',
  },*/
  /*jwt: {
    async encode({ secret, token }) {
      return token ? jwt.sign(token, secret) : false
    },
    async decode({ secret, token }) {
      return token ? jwt.verify(token, secret) : false
    },
  },*/
  pages: {
    signIn: '/login',
    newUser: '/auth/activate'
    /*signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)*/
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },      
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied       
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/login`, {
          email: credentials.email,
          password: credentials.password,
        });
        if (response.status === 200) {           
          //return response.data;
          //let token = createToken(response.data.user.email);
          console.log("login ok")
          const user = {
            ...response.data.user,
            accessToken: response.data.accessToken    
          }
          return user;
        } else {
          return null;
        }
       
      },      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      // TODO: only allow to signin if user has status ACTIVE or PENDING
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("JWT")
      console.log({token})
      console.log({user})
      console.log({account})
      if (account) {
        token.accessToken = account.access_token;        
        switch(account.type){
          case 'oauth':
            // TODO: create user or verify if it exist in db
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/oauth`, {
              email: user.email || '',
              name: user.name || '',
            });
            if (response.status === 200) {
              token.user = response.data
            }             
            console.log(token.user)
            break;
          case "credentials":
            token.user = user;            
            token.accessToken = user.accessToken;
            delete user.accessToken;             
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("SESSION")
      console.log({session})
      console.log({token})
      console.log({user})      
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    }
    /*async jwt({ token, user, account }) {
      console.log("JWT")
      console.log({user})
      if (user) {
        token = createToken(user.username as string);
      }
      let left = ((token.willExpire as number) - Date.now()) / 1000;
      if (left > 0) {
        return token;
      } else {
        let newToken = await refreshToken(token);
        return { ...newToken };
      }
    },*/
    /*async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.username = token.username;
      session.willExpire = token.willExpire;
      return session;
    },*/
  },
  secret: process.env.NEXTAUTH_SECRET  
}
export default NextAuth(authOptions)