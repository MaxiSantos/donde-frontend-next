import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Activate from '../../app/common/pages/auth/activate'

const Index: NextPage = () => {
  return <Activate />;
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      ...(await serverSideTranslations(context.locale, ['common'])),
    }
  };
}
export default Index
