import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QuerySearch } from "app/components/pageTemplate/Query/querySearch";
import { Default } from "app/common/components/layouts/default";
import Query from "app/components/pageTemplate/Query";
import { TranslationHelper } from "app/common/lib/translation";
import { getProtectedPath } from "app/config/auth";

const App = () => (
  <Default top={<QuerySearch />}>
    <Query />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    ...(await getProtectedPath("query", context)),
  }
  return {
    props,
  };
}

export default App;
