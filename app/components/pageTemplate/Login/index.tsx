import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();
  console.log("login component rendered")
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}
