import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Activate from '../../app/common/pages/auth/activate'
import { TranslationHelper } from 'app/common/lib/translation'
import Head from 'next/head';

const Index: NextPage = () => {
  return <>
    <Head>
      <meta name="robots" content="noindex,nofollow" key="robot" />
    </Head>
    <Activate />
  </>;
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}
export default Index
