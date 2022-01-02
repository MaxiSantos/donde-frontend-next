import { TranslationHelper } from 'app/common/lib/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Default } from '../app/common/components/layouts/default';
import { Signup } from '../app/common/components/pageTemplate/Auth/Signup';

const App = () => (
  <Default pageTitle="signup">
    <Signup />
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
