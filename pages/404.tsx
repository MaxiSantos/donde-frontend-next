import { Default } from 'app/common/components/layouts/default';
import { NotFound } from 'app/common/components/pageTemplate/404';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default pageTitle="Not found">
    <NotFound />
  </Default>
);

export async function getStaticProps(context) {
  const props = {
    protected: true,
    ...(await serverSideTranslations(context.locale, ['common'])),
  }
  return {
    props
  };
}

export default App;
