import { HomeSearch } from "app/components/pageTemplate/Home/homeSearch";
import { Default } from "../app/common/components/layouts/default";
import Home from "../app/components/pageTemplate/Home";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const App = () => (
  <Default top={<HomeSearch />}>
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
