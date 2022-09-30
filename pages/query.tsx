import { QuerySearch } from "app/components/pageTemplate/Query/querySearch";
import { Default } from "../app/common/components/layouts/default";
import Query from "../app/components/pageTemplate/Query";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TranslationHelper } from "app/common/lib/translation";
import { protectedPaths } from "app/config/auth";

const App = () => (
  <Default top={<QuerySearch />}>    
    <Query />
  </Default>
);

export async function getStaticProps(context) {
  const props = {    
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    pathConfig: protectedPaths.query
  }
  return {
    props
  };
}

export default App;
