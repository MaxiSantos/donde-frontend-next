import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/auth/signin',
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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },      
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
  
        if (credentials.username === "max" && credentials.password === "password1234.") {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if(token){
        session.accessToken = token.accessToken;
        session.id = token.id;

      }
      return session
    }
  },
  secret: process.env.SECRET  
}
export default NextAuth(authOptions)