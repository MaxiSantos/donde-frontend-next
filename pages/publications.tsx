import { Default } from 'app/common/components/layouts/default';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
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
  return await getPageProps({
    context,
    auth: {
      name: "publications",
    }
  })
}

export default App;
