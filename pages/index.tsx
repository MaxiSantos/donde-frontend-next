import { TranslationHelper } from 'app/common/lib/translation';
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from './home';

const Index: NextPage = () => {
  return <Home />;
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export default Index
