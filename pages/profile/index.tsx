import { Default } from "app/common/components/layouts/default";
import { TranslationHelper } from "app/common/lib/translation";
import { Profile } from "app/components/pageTemplate/Profile";
import { protectedPaths } from "app/config/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App = () => (
  <Default pageTitle="profile">
    <Profile />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      pathConfig: protectedPaths.profile,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource(['profile']))),
    }
  };
}

export default App;
