import { Default } from 'app/common/components/layouts/default';
import { TranslationHelper } from 'app/common/lib/translation';
import Publication from 'app/components/pageTemplate/Publication';
import { PublicationSearch } from 'app/components/pageTemplate/Publication/publicationSearch';
import { unstable_getServerSession } from "next-auth/next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getServerSession from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

const App = () => (
  <Default top={<PublicationSearch />} pageTitle="publication">
    <Publication />
  </Default>
);

export async function getServerSideProps(context) {
  const { req, res, locale } = context;
  //const session = await getServerSession(req, res, authOptions);
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log("session from getServerSideProps")
  console.log({session})
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(locale, TranslationHelper.getCommonSource())),
      session: session
    }
  }
}

export default App;
