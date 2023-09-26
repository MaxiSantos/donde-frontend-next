import { Default } from 'app/common/components/layouts/default';
import { NotFound } from 'app/common/components/pageTemplate/404';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import { TranslationHelper } from 'app/common/lib/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default>
    <NotFound />
  </Default>
);

export async function getStaticProps(context) {
  return await getPageProps({
    context,
    auth: {
      name: "404",
    }
  })
}

export default App;
