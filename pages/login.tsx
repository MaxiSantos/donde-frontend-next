import { TranslationHelper } from 'app/common/lib/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Default } from '../app/common/components/layouts/default';
import { Login } from '../app/common/components/pageTemplate/Auth/Login';

const App = () => (
  <Default pageTitle="login">
    <Login client='user' />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export default App;
