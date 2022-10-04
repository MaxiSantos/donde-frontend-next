import { TranslationHelper } from 'app/common/lib/translation';
import { protectedPaths } from 'app/config/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Default } from '../app/common/components/layouts/default';
import { Reset } from '../app/common/components/pageTemplate/Auth/Reset';

const App = () => (
  <Default>
    <Head>
      <meta name="robots" content="noindex,nofollow" key="robot" />
    </Head>
    <Reset />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      pathConfig: protectedPaths.reset,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource(['profile']))),
    }
  };
}

export default App;
