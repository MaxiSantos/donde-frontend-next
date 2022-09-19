import { TranslationHelper } from 'app/common/lib/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { unstable_getServerSession } from "next-auth/next"
import { Default } from 'app/common/components/layouts/default';
import { Login } from 'app/common/components/pageTemplate/Auth/Login';
import { getProviders, getCsrfToken } from "next-auth/react";
import { authOptions } from './api/auth/[...nextauth]';

const App = ({providers, csrfToken}) => (
  <Default>
    <Login client='user' providers={providers} csrfToken={csrfToken} />
  </Default>
);

export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const providers = await getProviders();
  const session = await unstable_getServerSession(req, res, authOptions);
  const { p = '/'} = query;
  console.log({session})
  if(session){
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }
  return {
    props: { 
      providers,
      csrfToken: await getCsrfToken(context),
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    },
  }
}

export default App;
