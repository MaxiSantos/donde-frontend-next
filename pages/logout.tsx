import { TranslationHelper } from 'app/common/lib/translation';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Default } from 'app/common/components/layouts/default';
import { Logout } from 'app/common/components/pageTemplate/Auth/Logout';

const App = () => (
  <Default>
    <Logout />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export default App;
