import Head from 'next/head';
import { Default } from '../app/common/components/layouts/default';
import { Reset } from '../app/common/components/pageTemplate/Auth/Reset';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import { GetStaticProps } from 'next';

const App = () => (
  <Default>
    <Head>
      <meta name="robots" content="noindex,nofollow" key="robot" />
    </Head>
    <Reset />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    translationSource: ['profile'],
    auth: {
      name: 'reset'
    }
  })
  /*return {
    props: {
      pathConfig: protectedPaths.reset,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource(['profile']))),
    }
  };*/
}

export default App;
