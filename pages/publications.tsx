import { Default } from 'app/common/components/layouts/default';
import { TranslationHelper } from 'app/common/lib/translation';
import Publication from 'app/components/pageTemplate/Publication';
import { PublicationSearch } from 'app/components/pageTemplate/Publication/publicationSearch';
import { unstable_getServerSession } from "next-auth/next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getServerSession from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import { getSession } from 'next-auth/react';

const App = () => (
  <Default top={<PublicationSearch />} pageTitle="publication">
    <Publication />
  </Default>
);

export async function getServerSideProps(context) {
  const { req, res, query, locale } = context;
  //const session = await getServerSession(req, res, authOptions);
  //const session = await unstable_getServerSession(req, res, authOptions);
  console.log("haaaaa")
  const session = await getSession(context);
  const { p = '/login'} = query;
  //console.log({session})
  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  console.log("session from getServerSideProps")
  //console.log({session})
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(locale, TranslationHelper.getCommonSource())),
      //session
    }
  }
}

export default App;
