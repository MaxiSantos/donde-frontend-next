import { HomeSearch } from "app/components/pageTemplate/Home/homeSearch";
import { Default } from "../app/common/components/layouts/default";
import Home from "../app/components/pageTemplate/Home";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Script from 'next/script'

const App = () => (
  <Default top={<HomeSearch />} pageTitle="home">
    <Script src="https://code.responsivevoice.org/responsivevoice.js?key=OWqODxS0"></Script>
    <Home />
  </Default>
);

export async function getStaticProps(context) {
  const props = {
    protected: true,
    ...(await serverSideTranslations(context.locale, ['common'])),
  }
  return {
    props
  };
}

export default App;
