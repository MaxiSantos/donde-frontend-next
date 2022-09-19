import withAuth from "next-auth/middleware"
import { authOptions } from "pages/api/auth/[...nextauth]";


export default withAuth({  
  //jwt: authOptions.jwt,
  callbacks: {
    authorized: ({ token }) => {
      console.log("middleware token ",token);
      return !!token;
    }
  },
})

//export { default } from "next-auth/middleware"

export const config = { matcher: ["/home", "/publications"] }
