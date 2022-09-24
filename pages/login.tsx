import { TranslationHelper } from 'app/common/lib/translation';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Default } from '../app/common/components/layouts/default';
import { Login } from '../app/common/components/pageTemplate/Auth/Login';

const App = () => (
  <Default>
    <Login client='user' />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {  
  return {
    props: {
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export default App;
