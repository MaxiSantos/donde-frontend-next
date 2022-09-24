import { Default } from 'app/common/components/layouts/default';
import { TranslationHelper } from 'app/common/lib/translation';
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
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export default App;
