import { Default } from 'app/common/components/layouts/default';
import Store from 'app/components/pageTemplate/Store';
import { StoreSearch } from 'app/components/pageTemplate/Store/storeSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default top={<StoreSearch />} pageTitle="Store">
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

export default App;
