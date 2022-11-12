import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QuerySearch } from "app/components/pageTemplate/Query/querySearch";
import { Default } from "app/common/components/layouts/default";
import Query from "app/components/pageTemplate/Query";
import { TranslationHelper } from "app/common/lib/translation";
import { protectedPaths } from "app/config/auth";
import { validateJWT } from "app/common/lib/jwt";

const App = () => (
  <Default top={<QuerySearch />}>
    <Query />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isAuthorized = await validateJWT(context.req, context.res);
  const props = {
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    pathConfig: protectedPaths.query,
    isAuthorized
  }
  return {
    props,
  };
}

export default App;
