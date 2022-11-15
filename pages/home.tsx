import { Default } from "../app/common/components/layouts/default";
import Home from "app/components/pageTemplate/Home";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Script from 'next/script'
import { TranslationHelper } from "app/common/lib/translation";

/*
TODO: should we use https://nextjs.org/docs/basic-features/script#afterinteractive Script Loader for responsivevoice?
*/
const App = () => (
  <Default>    
    <Home />
  </Default>
);

export async function getStaticProps(context) {
  const props = {    
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
  }
  return {
    props
  };
}

export default App;
