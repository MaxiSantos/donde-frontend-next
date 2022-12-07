import { Default } from 'app/common/components/layouts/default';
import { NotFound } from 'app/common/components/pageTemplate/404';
import { TranslationHelper } from 'app/common/lib/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default>
    <NotFound />
  </Default>
);

export async function getStaticProps(context) {
  const props = {
    protected: true,
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
  }
  return {
    props
  };
}

export default App;
