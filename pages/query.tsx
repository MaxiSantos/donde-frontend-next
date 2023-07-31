import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QuerySearch } from "app/components/pageTemplate/Query/querySearch";
import { Default } from "app/common/components/layouts/default";
import Query from "app/components/pageTemplate/Query";
import { TranslationHelper } from "app/common/lib/translation";
import { getProtectedPath } from "app/config/auth";
import { getEndpoint } from "app/common/lib/api/helper";

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
  const props = {
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    ...(getProtectedPath("query", isAuthenticated)),
  }
  return {
    props,
  };
}

export default App;
