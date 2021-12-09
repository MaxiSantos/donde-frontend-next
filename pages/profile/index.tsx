import { Default } from "app/common/components/layouts/default";
import { Profile } from "app/components/pageTemplate/Profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App = () => (
  <Default pageTitle="profile">
    <Profile />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      ...(await serverSideTranslations(context.locale, ['common', 'profile'])),
    }
  };
}

export default App;
