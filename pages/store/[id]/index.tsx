import { Default } from "app/common/components/layouts/default";
import { TranslationHelper } from "app/common/lib/translation";
import Store from "app/components/pageTemplate/Store/item";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App = () => (
  <Default>
    <Store />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export default App;
