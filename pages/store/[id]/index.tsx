import { Default } from "app/common/components/layouts/default";
import Store from "app/components/pageTemplate/Store/item";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App = () => (
  <Default pageTitle="Store">
    <Store />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(context.locale, ['common'])),
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
