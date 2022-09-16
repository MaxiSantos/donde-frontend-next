import { Default } from 'app/common/components/layouts/default';
import { TranslationHelper } from 'app/common/lib/translation';
import Publication from 'app/components/pageTemplate/Publication';
import { PublicationSearch } from 'app/components/pageTemplate/Publication/publicationSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'


const App = () => (
  <Default top={<PublicationSearch />} pageTitle="publication">
    <Publication />
  </Default>
);

export async function getServerSideProps({ req, res, locale }) {
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(locale, TranslationHelper.getCommonSource())),
      session: await unstable_getServerSession(req, res, authOptions)
    }
  }
}

export default App;
