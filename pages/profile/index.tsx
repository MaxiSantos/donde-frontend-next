import { GetServerSideProps } from "next";
import Head from 'next/head'
import { Default } from "app/common/components/layouts/default";
import { Profile } from "app/components/pageTemplate/Profile";
import { getPageProps } from "app/common/lib/page/pageNextProps";

const App = () => (
  <Default pageTitle="profile">
    <Head>
      <meta name="robots" content="noindex,nofollow" key="robot" />
    </Head>
    <Profile />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getPageProps({
    context,
    translationSource: ["profile"],
    auth: {
      name: "profile",
      checkJWT: true
    }
  })
}

export default App;
