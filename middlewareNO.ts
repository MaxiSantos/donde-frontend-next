import withAuth from "next-auth/middleware"
import type { WithAuthArgs } from "next-auth/middleware"
import { authOptions } from "pages/api/auth/[...nextauth]";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("middleware token ",token);
      //return true;
      return !!token;
    }
  },
  jwt: { 
    decode: authOptions.jwt.decode 
  },
})

//export { default } from "next-auth/middleware"

export const config = { matcher: ["/home", "/publications"] }
