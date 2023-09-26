import { GetServerSideProps } from "next";
import { QuerySearch } from "app/components/pageTemplate/Query/querySearch";
import { Default } from "app/common/components/layouts/default";
import Query from "app/components/pageTemplate/Query";
import { getEndpoint } from "app/common/lib/api/helper";
import { getPageProps } from "app/common/lib/page/pageNextProps";

const App = () => (
  <Default top={<QuerySearch />}>
    <Query />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const logApiRoute = `${getEndpoint()}/api/log`;
  let headerNames = context.req.headers;
  let isAuthenticated = headerNames.isauthenticated as string;
  console.log("headerNames.isauthenticated")
  console.log(headerNames.isauthenticated)
  try {
    await fetch(logApiRoute, {
      method: 'POST',
      body: JSON.stringify({ origin: "getServerSideProps", isAuthenticated, headerNames })
    });
  } catch (err) {
    console.log(err);
  }

  return await getPageProps({
    context,
    translationSource: ["query"],
    auth: {
      name: "query",
      checkJWT: true
    }
  })
}

export default App;
