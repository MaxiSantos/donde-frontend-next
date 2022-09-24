import { Default } from 'app/common/components/layouts/default';
import { TranslationHelper } from 'app/common/lib/translation';
import Notification from 'app/components/pageTemplate/Notification';
import { protectedPaths } from 'app/config/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default pageTitle="notification">
    <Notification />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      pathConfig: protectedPaths.notifications,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}

export default App;
