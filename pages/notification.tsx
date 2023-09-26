import { Default } from 'app/common/components/layouts/default';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
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
  return await getPageProps({
    context,
    auth: {
      name: "notifications",
    }
  })
}

export default App;
