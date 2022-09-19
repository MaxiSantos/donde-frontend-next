import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Activate from 'app/common/pages/auth/activate'
import { TranslationHelper } from 'app/common/lib/translation'
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const Index: NextPage = () => {
  return <Activate />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req, res, query} = context
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
      protected: false,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}
export default Index
