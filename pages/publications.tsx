import { Default } from 'app/common/components/layouts/default';
import Publication from 'app/components/pageTemplate/Publication';
import { PublicationSearch } from 'app/components/pageTemplate/Publication/publicationSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default top={<PublicationSearch />} pageTitle="publication">
    <Publication />
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
