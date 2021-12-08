import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Default } from '../app/common/components/layouts/default';
import { Login } from '../app/common/components/pageTemplate/Auth/Login';

const App = () => (
  <Default pageTitle="Login">
    <Login />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      ...(await serverSideTranslations(context.locale, ['common'])),
    }
  };
}

export default App;
