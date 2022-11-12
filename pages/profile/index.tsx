import { GetServerSideProps } from "next";
import Head from 'next/head'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Default } from "app/common/components/layouts/default";
import { TranslationHelper } from "app/common/lib/translation";
import { Profile } from "app/components/pageTemplate/Profile";
import { getProtectedPath } from "app/config/auth";

const App = () => (
  <Default pageTitle="profile">
    <Head>
      <meta name="robots" content="noindex,nofollow" key="robot" />
    </Head>
    <Profile />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await getProtectedPath("profile", context)),
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource(['profile']))),
    }
  };
}

export default App;
